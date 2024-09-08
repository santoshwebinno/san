import { NextRequest, NextResponse } from 'next/server';
import shopify from '@/lib/shopify';
import customSessionHandler, { checkClientExists } from '@/lib/customSessionCli3';
import { getSecretKeyFromMetafield, storeSecretKeyInMetafield } from '@/lib/storeSecretKeyShopifyMeta';

export async function GET(req: NextRequest) {
  try {
    console.log('Before shopify.auth.callback');

    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: NextResponse,
    });

    console.log('After shopify.auth.callback');
    const { session } = callbackResponse;

    console.log('Session created:', session);

    // Prevent reusing the same authorization code
    if (!session || !session.accessToken) {
      console.error('Session or access token is missing after auth callback');
      return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/signup`);
    }

    

    const { exists, userCreated, secret_key } = await checkClientExists(session);

    console.log("🚀 ~ file: route.ts:39 ~ GET ~ secret_key:", secret_key)
    if (secret_key) {
      await storeSecretKeyInMetafield(session, secret_key);
      console.log("Secret key stored in Shopify metafield:", secret_key);
    } else {
      console.warn("No secret key provided.");
    }
    if(userCreated==false){
      console.log('User already exists. Please log in or contact support');
    }
    const secretKey = await getSecretKeyFromMetafield(session);

    if (secretKey) {
      console.log('Secret key retrieved and will be used in the session:', secretKey);
      (session as any).secret_key = secretKey;
    } else {
      console.warn('Secret key not found in metafields.');
    }
    console.log('Before customSessionHandler.storeSession');
    const storeResult = await customSessionHandler.storeSession(session);

    console.log("🚀 ~ file: route.ts:28 ~ GET ~ storeResult:", storeResult);

    console.log('After customSessionHandler.storeSession');


    if (!storeResult) {
      console.error('Failed to store session');
      return new NextResponse('Internal Server Error', { status: 500 });
    }

    
    // Set the session ID in a cookie
    const res = NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/${exists?`main?host=${session.shop}&shop=${session.shop}`:`signup?authenticated=true`}`);
    res.cookies.set('shopify_app_session', session.id, {
      httpOnly: true,
      sameSite: 'lax', // Use lowercase 'lax'
      path: '/', // Ensure the cookie is accessible throughout the app
    });
    console.log('Session ID set in cookie:', session.id);

    console.log('Before shopify.webhooks.register');
    const webhooks = await shopify.webhooks.register({
      session,
    });
    console.log('After shopify.webhooks.register');
    console.log('Webhooks registered:', webhooks);

    console.log('Redirecting to:', `${process.env.SHOPIFY_APP_URL}/main?host=${session.shop}&shop=${session.shop}`);
    return res;
  } catch (error: any) {
    console.error('Error occurred at /auth/callback:', error);

    if (error.response?.body?.error === 'invalid_request' &&
        error.response?.body?.error_description.includes('authorization code was not found or was already used')) {
      console.error('Authorization code issue:', error.response.body.error_description);
      return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/signup`);
    }

    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

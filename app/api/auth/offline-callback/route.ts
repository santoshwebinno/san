import { NextRequest, NextResponse } from 'next/server';
import shopify from '@/lib/shopify';

export async function GET(req: NextRequest) {
  console.log('Handling GET request for offline callback');
  try {
    const callbackResponse = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: NextResponse,
    });

    const { session } = callbackResponse;
    console.log('Session created:', session);

    const url = new URL(req.url);
    const host = url.searchParams.get('host');
    const shop = url.searchParams.get('shop');

    const redirectUrl = `${process.env.SHOPIFY_APP_URL}/api/auth/?host=${host}&shop=${shop}`;
    console.log('Redirecting to:', redirectUrl);
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    console.error('Error during GET offline callback:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
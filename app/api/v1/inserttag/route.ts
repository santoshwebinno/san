import { NextResponse } from 'next/server';
import shopify from '@/lib/shopify'; // Import your configured Shopify instance
import customSessionHandler from '@/lib/customSessionCli3';
import { Session } from '@shopify/shopify-api';

export async function GET(req: Request) {
  // Retrieve session and request data
  const sessionId: any = req.headers.get('x-session-id');
  const sessionData: any = await customSessionHandler.loadSession(sessionId);

  // Construct the Session object
  const session: any = {
    id: sessionId!,
    shop: sessionData.shop,
    state: sessionData.state || '', // Ensure this is populated, otherwise use a fallback
    isOnline: sessionData.isOnline,
    accessToken: sessionData.accessToken,
    scope: sessionData.scope,
    expires: new Date(sessionData.expires),
    onlineAccessInfo: sessionData.onlineAccessInfo,
    isActive: () => true, // Implement based on your application's logic
  };

  const environment = 'dev'; // Assuming you're in development mode

  try {
    // Create the REST client for the current session
    const client = new shopify.clients.Rest({
      session,
    });

    // Step 1: Fetch all existing script tags
    const existingScriptTags = await client.get({
      path: 'script_tags',
    });

    // Step 2: Remove only the script tags that match your specific domain or URL pattern
    if (existingScriptTags && existingScriptTags.body && existingScriptTags.body.script_tags) {
      const scriptTags = existingScriptTags.body.script_tags;
      for (const scriptTag of scriptTags) {
        const scriptSrc = scriptTag.src;

        // Check if the script URL contains your domain or pattern
        if (
          scriptSrc.includes(`${process.env.SHOPIFY_APP_URL}`) ||
          scriptSrc.includes('norgcdnstorage.blob.core.windows.net') || // Add more domains/patterns if needed
          scriptSrc.includes('your-secure-server.com')
        ) {
          // If it matches, delete the script tag
          await client.delete({
            path: `script_tags/${scriptTag.id}`,
          });
          console.log(`Deleted script tag with ID: ${scriptTag.id} and src: ${scriptSrc}`);
        }
      }
    }

    // Step 3: Define the new script tag to be inserted into the Shopify store's frontend
    const newScriptTag = {
      script_tag: {
        event: 'onload',
        src: `${process.env.SHOPIFY_APP_URL}/api/norgai-injector`, // Use the Ngrok URL
      },
    };

    // Step 4: Add the new script tag
    const response = await client.post({
      path: 'script_tags',
      data: newScriptTag,
    });

    console.log('New script tag created successfully:', response);

    // Return success response
    return new NextResponse(JSON.stringify({ success: 'New script tag created successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error handling script tags:', error);

    // Return error response
    return new NextResponse(JSON.stringify({ error: 'Failed to handle script tags' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

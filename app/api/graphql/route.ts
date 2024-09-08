import customSessionHandler from '@/lib/customSessionCli3';
import shopify from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('Handling POST request');

  try {
    // Attempt to retrieve the session ID automatically
    let sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: req,
      rawResponse: NextResponse,
    });
    console.log('Shopify Object:', shopify);
    console.log('Shopify Session Methods:', shopify.session);

    // Log session ID retrieval
    console.log("Session ID from shopify.session.getCurrentId:", sessionId);

    // Fallback: Manually retrieve session ID from cookies if not found
    if (!sessionId) {
      console.log('Session ID not found automatically, attempting manual retrieval.');
      sessionId = req.cookies.get('shopify_app_session')?.value;
      console.log('Manually retrieved Session ID:', sessionId);
    }

    if (!sessionId) {
      console.error('Session ID not found');
      return NextResponse.json({ error: 'Session ID not found' }, { status: 401 });
    }

    console.log('Session ID:', sessionId);

    // Load the session using the session ID
    const session = await customSessionHandler.loadSession(sessionId);

    if (!session) {
      console.error('Session not found for ID:', sessionId);
      return NextResponse.json({ error: 'Session not found' }, { status: 401 });
    }

    console.log('Session loaded:', session);

    const requestBody = await req.json();
    console.log('Request Body:', requestBody);

    const response = await shopify.clients.graphqlProxy({
      session,
      rawBody: requestBody,
    });

    console.log('POST request successful');
    return NextResponse.json(response.body);
  } catch (err: any) {
    console.error('Error in POST request:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

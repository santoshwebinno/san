import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const shopifyAppUrl = process.env.SHOPIFY_APP_URL;
  console.log(`Shopify App URL: ${shopifyAppUrl}`);
  
  console.log('Middleware triggered. URL:', req.url);
  console.log('Pathname:', pathname);
  console.log('Search Params:', searchParams.toString());

  // Ignore requests for static assets
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname === '/favicon.ico'
  ) {
    console.log('Static asset request bypassed:', pathname);
    return NextResponse.next();
  }

  // Bypass middleware for webhook routes
  if (pathname.startsWith('/api/webhooks/')) {
    console.log('Bypassing middleware for webhook route:', pathname);
    return NextResponse.next();
  }

  function appendSessionIdToHeaders(req: NextRequest, sessionId: string): NextRequest {
    const headers = new Headers(req.headers);
    headers.set('x-session-id', sessionId);

    console.log('Modified request with session ID in headers:', headers.get('x-session-id'));

    return new NextRequest(req.url, {
      method: req.method,
      headers: headers,
      body: req.body,
    });
  }

  // Handle main and GraphQL routes
  if (pathname.startsWith('/main') || pathname.startsWith('/api/graphql') || pathname.startsWith('/api/v1/')) {
    const shop = searchParams.get('shop');
    const sessionId = req.cookies.get('shopify_app_session')?.value;

    console.log('Processing /main, /graphql, or /api/v1/ route:', pathname);
    console.log('Shop parameter:', shop);
    console.log('Session ID from cookie:', sessionId);

    if (!sessionId) {
      console.log('Session ID is undefined.');
      if (shop) {
        console.log('Shop is defined, redirecting to auth/offline with shop:', shop);
        return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/api/auth/offline?shop=${shop}`);
      }

      console.log('Both shop and session ID are undefined. Redirecting to login.');
      return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/signup`);
    } else {
      console.log('Session ID found, attempting to fetch session data via API.');

      try {
        const sessionResponse = await fetch(`${process.env.SHOPIFY_APP_URL}/api/session?id=${sessionId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!sessionResponse.ok) {
          console.error('Session could not be found in PostgreSQL via API.');
          return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/signup`);
        }
        
        const { session } = await sessionResponse.json();
        console.log('Session data retrieved:', session);
        console.log('Session.shop data:', session);
        
        if (shop) {
          console.log('Shop parameter is defined. Checking session data.');
        
          const normalizedSessionShop = session.trim().toLowerCase(); // session is directly the shop string
          const normalizedShop = shop.trim().toLowerCase();
        
          console.log('Comparing normalized shop values:', { 
            normalizedSessionShop, 
            normalizedShop, 
            normalizedSessionShopLength: normalizedSessionShop.length, 
            normalizedShopLength: normalizedShop.length 
          });
        
          if (session && normalizedSessionShop === normalizedShop) {
            console.log('Session matches the shop. Proceeding to the requested route.');

            if (pathname.startsWith('/api/v1/')) {
              const modifiedReq = await appendSessionIdToHeaders(req, sessionId);
              return NextResponse.next(modifiedReq);
            }

            return NextResponse.next();
          } else {
            console.log('Session shop mismatch or session is undefined. Redirecting to auth/offline.');
            return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/api/auth/offline?shop=${shop}`);
          }
        } else {
          console.log('Shop parameter is undefined, but session is valid. Proceeding.');
          if (pathname.startsWith('/api/v1/')) {
            const modifiedReq = await appendSessionIdToHeaders(req, sessionId);
            return NextResponse.next(modifiedReq);
          }
          return NextResponse.next();
        }        
      } catch (error) {
        console.error('Error while fetching session data via API:', error);
        return NextResponse.redirect(`${process.env.SHOPIFY_APP_URL}/signup`);
      }
    }
  }

  console.log('No specific route matched, proceeding to the requested route.');
  return NextResponse.next();
}

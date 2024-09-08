import { NextRequest, NextResponse } from 'next/server';
import shopify from '@/lib/shopify';

async function handleAuth(req: NextRequest) {
  const url = new URL(req.url);
  const shop = url.searchParams.get('shop');

  if (!shop) {
    console.log('Shop parameter is missing, redirecting to login');
    return NextResponse.redirect('/signup');
  }

  try {
    return await shopify.auth.begin({
      shop,
      callbackPath: '/api/auth/offline-callback', // change back to offline-callback in ngrok if not working
      isOnline: false, // Offline mode
      rawRequest: req,
      rawResponse: NextResponse,
    });
  } catch (error: any) {
    console.error('Error during offline authentication:', error);
  }
}

export async function GET(req: NextRequest) {
  console.log('Handling GET request for offline auth');
  return handleAuth(req);
}

export async function POST(req: NextRequest) {
  console.log('Handling POST request for offline auth');
  return handleAuth(req);
}
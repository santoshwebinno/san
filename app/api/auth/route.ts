import shopify from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('Handling api/auth/router.ts');
  const shop = req.nextUrl.searchParams.get('shop');

  if (!shop) {
    return NextResponse.redirect('/signup');
  }

  return shopify.auth.begin({
    shop,
    callbackPath: '/api/auth/callback',
    isOnline: true,
    rawRequest: req,
    rawResponse: NextResponse,
  });
}
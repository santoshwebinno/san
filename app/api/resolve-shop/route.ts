import { NextResponse } from 'next/server';

// Utility to strip protocol from domain and resolve Shopify subdomain
const stripProtocol = (url: string): string => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, ''); // Removes protocol and trailing slash
};

// Check if the .myshopify.com domain is valid
const verifyMyShopifyDomain = async (shopifyDomain: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://${shopifyDomain}`, {
      method: 'HEAD',
    });
    // If we get a 200 response, it’s a valid Shopify store
    return response.status === 200;
  } catch (error) {
    console.error(`Error verifying Shopify domain: ${shopifyDomain}`, error);
    return false;
  }
};

// First, check if the custom domain is a Shopify store by checking the headers
const isShopifyStore = async (domain: string): Promise<boolean> => {
  try {
    const sanitizedDomain = stripProtocol(domain);
    const response = await fetch(`https://${sanitizedDomain}`, {
      method: 'HEAD',
    });

    // Check if Shopify-specific headers exist, such as `x-shopify-stage` or `x-shopid`
    const isShopify = response.headers.get('x-shopify-stage') || response.headers.get('x-shopid');

    return !!isShopify; // Return true if it's a Shopify store
  } catch (error) {
    console.error('Error detecting Shopify store:', error);
    return false;
  }
};

// Derive the `.myshopify.com` domain from the custom domain
const deriveMyShopifyDomain = (customDomain: string): string => {
  const domainParts = stripProtocol(customDomain).split('.');
  const shopName = domainParts[0]; // Assuming the shop name is the first part of the domain (e.g., "shopname.com")
  return `${shopName}.myshopify.com`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customDomain } = body;

    if (!customDomain) {
      return NextResponse.json({ error: 'Custom domain is required' }, { status: 400 });
    }

    // First, check if the custom domain is a Shopify store
    const isShopify = await isShopifyStore(customDomain);

    if (isShopify) {
      // Derive the .myshopify.com domain and verify if it's valid
      const shopifyDomain = deriveMyShopifyDomain(customDomain);
      const isValidShopifyDomain = await verifyMyShopifyDomain(shopifyDomain);

      if (isValidShopifyDomain) {
        return NextResponse.json({ shop: shopifyDomain });
      } else {
        return NextResponse.json({ error: 'Unable to verify the .myshopify.com domain' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'The domain is not a valid Shopify store' }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

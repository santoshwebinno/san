import { NextResponse } from 'next/server';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

// Utility to strip protocol from domain and resolve Shopify subdomain
const stripProtocol = (url: string): string => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, ''); // Removes protocol and trailing slash
};

// Fetch the HTML content from the domain
const fetchHtml = async (domain: string): Promise<string | null> => {
  try {
    const sanitizedDomain = stripProtocol(domain);
    const response = await fetch(`https://${sanitizedDomain}`, {
      method: 'GET',
    });
    if (response.ok) {
      return await response.text();
    }
    return null;
  } catch (error) {
    console.error('Error fetching HTML from domain:', error);
    return null;
  }
};

// Extract the Shopify shop name from the HTML
const extractShopifyData = (html: string): string | null => {
  try {
    const dom = new JSDOM(html);
    const scripts: any = dom.window.document.querySelectorAll('script');

    // Look for the script containing "Shopify.shop"
    for (let script of scripts) {
      if (script.textContent && script.textContent.includes('Shopify.shop')) {
        const matches = script.textContent.match(/Shopify\.shop\s*=\s*["'](.*?)["']/);
        if (matches) {
          const fullShopDomain = matches[1]; // e.g., "superfeast.myshopify.com"
          const shopName = fullShopDomain.split('.myshopify.com')[0]; // Extract shop name
          return shopName; // Return just the shop name
        }
      }
    }
    return null;
  } catch (error) {
    console.error('Error extracting Shopify data:', error);
    return null;
  }
};

// Search for any .myshopify.com domain in the entire page source
const findMyShopifyDomainInPage = (html: string): string | null => {
  try {
    const regex = /([a-zA-Z0-9-]+)\.myshopify\.com/g; // Regex to match any myshopify.com domain
    const matches = html.match(regex);
    
    if (matches && matches.length > 0) {
      // Extract the shop name from the first match
      const fullShopDomain = matches[0]; // e.g., "superfeast.myshopify.com"
      const shopName = fullShopDomain.split('.myshopify.com')[0]; // Extract shop name
      return shopName; // Return just the shop name
    }
    return null;
  } catch (error) {
    console.error('Error searching for .myshopify.com in page source:', error);
    return null;
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customDomain } = body;

    if (!customDomain) {
      return NextResponse.json({ error: 'Custom domain is required' }, { status: 400 });
    }

    // Fetch the HTML content of the custom domain
    const html = await fetchHtml(customDomain);

    // Try to extract the Shopify.shop name from the HTML content
    let shopifyShopName = html ? extractShopifyData(html) : null;

    // If not found in the HTML, search for any .myshopify.com in the page source
    if (!shopifyShopName && html) {
      shopifyShopName = findMyShopifyDomainInPage(html);
    }

    if (shopifyShopName) {
      return NextResponse.json({ shop: shopifyShopName });
    } else {
      return NextResponse.json({ error: 'Shopify.shop not found in the domain' }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

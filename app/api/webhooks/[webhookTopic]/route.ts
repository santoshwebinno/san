import shopify from '@/lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('Incoming Webhook');
  const topic = req.headers.get('x-shopify-topic') || '';
  const shop = req.headers.get('x-shopify-shop-domain') || '';

  try {
    const bodyChunks: Uint8Array[] = [];
    const reader = req.body?.getReader();
    if (reader) {
      let done = false;
      while (!done) {
        const { done: isDone, value } = await reader.read();
        if (value) {
          bodyChunks.push(value);
        }
        done = isDone;
      }
    }

    const rawBody = Buffer.concat(bodyChunks).toString('utf8');
    console.log('Parsed raw body:', rawBody);

    await shopify.webhooks.process({
      rawBody,
      rawRequest: req,
      rawResponse: NextResponse,
    });

    console.log(`Webhook ${topic} from ${shop} processed, returned status code 200`);
    return new NextResponse(`Webhook ${topic} from ${shop} processed`, { status: 200 });
  } catch (error: any) {
    console.log(`Failed to process webhook ${topic} from ${shop}: ${error}`);
    return new NextResponse(`Webhook ${topic} from ${shop} failed!`, { status: 500 });
  }
}

import customSessionHandler from '@/lib/customSessionCli3';
import { NextRequest, NextResponse } from 'next/server';

// const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || '3000';
const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || 'http://127.0.0.1:8001';

export async function POST(req: NextRequest) {
  try {
    // Extract sessionId and storeURL from the request body
    const requestBody = await req.json();
    console.log('Request body received:', req);
    const sessionId = req.headers.get('x-session-id');
  console.log('Session ID from header:', sessionId);

    // Extract sessionId and storeURL from the request body
    const {  storeURL } = requestBody;
    console.log('Extracted values:', {
      sessionId,
      storeURL,
    });
    
    // Validate the required fields
    if (!sessionId || !storeURL) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Load session data using sessionId
    const sessiondata:any = await customSessionHandler.loadSession(sessionId);
    if (!sessiondata) {
      return new NextResponse('Invalid session ID', { status: 401 });
    } else {
      console.log('Session data loaded:', sessiondata);

      // Extract the secret_key from the session data
      const secretKey = sessiondata.secret_key;
      if (!secretKey) {
        return new NextResponse('Secret key missing in session data', { status: 401 });
      }

      // Construct the necessary fields using storeURL and other logic
      const payload = {
        source: 'Magento-Url',
        urls: [storeURL],
        crawl_type: 'initial_crawl',
        is_single_page_scrapes: [false],
      };

      // Log the payload to ensure it is correct
      console.log('Sending payload to backend:', payload);

      // Send the POST request to the backend with the secret_key in the headers
      const response = await fetch(`${BACKEND_ENDPOINT}/api/v1/public/web-crawl`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Secret-Key': `${secretKey}`, // Include secret_key in the Authorization header
        },
        body: JSON.stringify(payload),
      });

      // Handle the backend response
      if (response.ok) {
        const data = await response.json();
        const { response: responseMessage, task_ids } = data;

        console.log("🚀 ~ file: route.ts ~ POST ~ task_ids:", task_ids);

        if (task_ids && task_ids.length > 0) {
          return NextResponse.json({ success: true, response: responseMessage, task_ids });
        } else {
          return NextResponse.json({ success: false, message: 'Crawl started, but no task IDs returned' }, { status: 500 });
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to start web crawl:', errorData);
        return NextResponse.json({ success: false, message: 'Web crawl failed', error: errorData }, { status: response.status });
      }
    }
  } catch (error) {
    console.error('Error occurred in /api/v1/train:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

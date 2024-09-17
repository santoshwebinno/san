import customSessionHandler from '@/lib/customSessionCli3';
import { NextRequest, NextResponse } from 'next/server';

// const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || 'http://127.0.0.1:8001';
const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || '3000';


export async function POST(req: NextRequest) {
  try {
    // Extract sessionId and task_ids from the request body
    const requestBody = await req.json();
    const sessionId = req.headers.get('x-session-id');
    console.log('Session ID from header:', sessionId);

    const { task_ids } = requestBody;
    console.log('Extracted values:', { sessionId, task_ids });

    // Validate the required fields
    if (!sessionId || !task_ids || task_ids.length === 0) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Load session data using sessionId
    const sessiondata: any = await customSessionHandler.loadSession(sessionId);
    if (!sessiondata) {
      return new NextResponse('Invalid session ID', { status: 401 });
    } else {
      console.log('Session data loaded:', sessiondata);

      // Extract the secret_key from the session data
      const secretKey = sessiondata.secret_key;
      if (!secretKey) {
        return new NextResponse('Secret key missing in session data', { status: 401 });
      }

      // Construct the payload with task_ids
      const payload = { task_ids,"include_progress": true };
      console.log('Sending payload to backend:', payload);

      // Send the POST request to the backend with the secret_key in the headers
      const response = await fetch(`${BACKEND_ENDPOINT}/api/v1/public/celery-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Secret-Key': `${secretKey}`, // Include secret_key in the headers
        },
        body: JSON.stringify(payload),
      });

      // Handle the backend response
      if (response.ok) {
        // const data = await response.json();
        const data = [
          {
            result: 'COMPLETED',
            state: 'COMPLETED',
            details: {
              current: 100,
              total: 100,
              percent: 100,
              process: 'Web crawl has completed',
              info: 'Web crawl has completed'
            },
            timestamp: '2024-09-06T00:52:00.466553',
            task_id: '60c9c82a-4500-428f-8599-05133e80f942'
          }
        ]
        console.log('Full Task status response:', data); // Log the full data for debugging

        // Since the response is an array, no need for summary, just return the tasks array
        if (Array.isArray(data)) {
          return NextResponse.json({ success: true, tasks: data });
        } else {
          return new NextResponse('Invalid response format from backend', { status: 500 });
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to get task status:', errorData);
        return NextResponse.json({ success: false, message: 'Failed to retrieve task status', error: errorData }, { status: response.status });
      }
    }
  } catch (error) {
    console.error('Error occurred in /api/v1/celery-status:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

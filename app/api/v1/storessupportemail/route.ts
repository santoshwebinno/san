import customSessionHandler from '@/lib/customSessionCli3';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || 'http://127.0.0.1:8001';
// const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || '3000';


export async function POST(req: NextRequest) {
  try {
    // Parse the request body to extract required fields
    const requestBody = await req.json();
    console.log('Request body received:', requestBody);

    const sessionId = req.headers.get('x-session-id');
    console.log('Session ID from header:', sessionId);

    // Extract supportEmail from request body
    const { supportEmail } = requestBody;
    console.log('Extracted values:', {
      sessionId,
      supportEmail,
    });

    // Validate the required fields
    if (!sessionId || !supportEmail) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Load session data using sessionId
    const sessionData: any = await customSessionHandler.loadSession(sessionId);
    if (!sessionData) {
      return new NextResponse('Invalid session ID', { status: 401 });
    } else {
      console.log('Session data loaded:', sessionData);

      // Extract the secret_key from the session data
      const secretKey = sessionData.secret_key;
      if (!secretKey) {
        return new NextResponse('Secret key missing in session data', { status: 401 });
      }

      // Construct payload to update SupportEmail
      const payload = {
        user_id: sessionData.user_id,
        supportEmail: supportEmail,
      };

      // Log the payload to ensure it is correct
      console.log('Sending payload to backend:', payload);

      // Send the POST request to the backend to update SupportEmail
      const response = await fetch(`${BACKEND_ENDPOINT}/api/v1/public/user-support-email`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Secret-Key': `${secretKey}`, // Include secret_key in the headers
        },
        body: JSON.stringify(payload),
      });

      // Handle the backend response
      if (response.ok) {
        const data = await response.json();
        console.log('SupportEmail update successful:', data);

        return NextResponse.json({ success: true, message: 'Support email updated successfully' });
      } else {
        const errorData = await response.json();
        console.error('Failed to update support email:', errorData);
        return NextResponse.json({ success: false, message: 'Support email update failed', error: errorData }, { status: response.status });
      }
    }
  } catch (error) {
    console.error('Error occurred in storessupportemail/route.ts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

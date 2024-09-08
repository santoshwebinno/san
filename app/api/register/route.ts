import { NextRequest, NextResponse } from 'next/server';

const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT || 'http://127.0.0.1:8001';

export async function POST(req: NextRequest) {
  try {
    const { email, first_name, last_name, display_name, source, domain } = await req.json();
    console.log('Extracted values:', {
        email,
        first_name,
        last_name,
        display_name,
        domain,
      });
    // Validate the required fields
    if (!email || !first_name || !last_name || !display_name || !source || !domain) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Construct the request payload
    const payload = {
      email,
      first_name,
      last_name,
      display_name,
      source,
      domain,
    };

    // Log the payload to ensure it is correct
    console.log('Sending payload to backend:', payload);

    // Send the POST request to the backend
    const response = await fetch(`${BACKEND_ENDPOINT}/api/v1/public/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Handle the backend response
    if (response.ok) {
      const data = await response.json();
      const { secret_key } = data;

      console.log("🚀 ~ file: route.ts:47 ~ POST ~ secret_key:", secret_key);


      if (secret_key) {
        return NextResponse.json({ success: true, secret_key });
      } else {
        return NextResponse.json({ success: false, message: 'Registration failed: secret_key not returned' }, { status: 500 });
      }
    } else {
      const errorData = await response.json();
      console.error('Failed to register user:', errorData);
      return NextResponse.json({ success: false, message: 'Registration failed', error: errorData }, { status: response.status });
    }
  } catch (error) {
    console.error('Error occurred in /api/register:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

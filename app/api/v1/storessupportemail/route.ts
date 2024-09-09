import customSessionHandler from '@/lib/customSessionCli3';
import { NextResponse } from 'next/server';

// Your Azure B2C credentials
const CLIENT_ID: any = process.env.AZURE_AD_B2C_CLIENT_ID;
const CLIENT_SECRET: any = process.env.AZURE_AD_B2C_CLIENT_SECRET;
const TENANT_ID = process.env.AZURE_AD_B2C_TENANT_ID;
const EXT_APP_ID = process.env.AZURE_AD_B2C_EXT_APP_ID; // This is your extension app ID
const GRAPH_API_URL = `https://graph.microsoft.com/v1.0`;

if (!CLIENT_ID || !CLIENT_SECRET || !TENANT_ID || !EXT_APP_ID) {
  throw new Error('Azure B2C Client ID, Client Secret, Tenant ID, or Extension App ID is missing');
}

// Step 1: Get Access Token using client credentials
async function getAccessToken() {
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', CLIENT_SECRET);
  params.append('scope', 'https://graph.microsoft.com/.default');
  params.append('grant_type', 'client_credentials');

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const data = await response.json();
  if (!data.access_token) {
    throw new Error('Failed to retrieve access token');
  }

  return data.access_token;
}

// Step 2: Find User by SecretKey
async function findUserBySecretKey(secretKey: string, accessToken: string) {
  // Use the Graph API to search for the user by their custom attribute
  const searchUrl = `${GRAPH_API_URL}/users?$filter=extension_${EXT_APP_ID}_SecretKey eq '${secretKey}'`;

  const response = await fetch(searchUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  if (data.value.length === 0) {
    throw new Error('User not found with the provided SecretKey');
  }

  return data.value[0]; // Assuming the first match is the user you want
}

// Step 3: Update User's SupportEmail using objectId
async function updateSupportEmail(secretKey: string, supportEmail: string) {
  const accessToken = await getAccessToken();

  // First, find the user by their SecretKey (custom attribute)
  const user = await findUserBySecretKey(secretKey, accessToken);
  const userId = user.id; // Get the user ID (objectId)

  // Now update the SupportEmail attribute for the user
  const userUrl = `${GRAPH_API_URL}/users/${userId}`;

  const response = await fetch(userUrl, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      [`extension_${EXT_APP_ID}_SupportEmail`]: supportEmail, // Replace with your actual attribute name
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to update SupportEmail: ${errorData.error.message}`);
  }

  return NextResponse.json({ message: 'SupportEmail updated successfully' });
}

export async function POST(req: Request) {
  try {
    const sessionId: any = req.headers.get('x-session-id');
    console.log('Session ID from header:', sessionId);

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

      const { supportEmail } = await req.json();

      // Validate input
      if (!supportEmail) {
        return NextResponse.json(
          { error: 'Invalid request: supportEmail is required' },
          { status: 400 }
        );
      }

      // Step 3: Update SupportEmail using secret_key
      await updateSupportEmail(secretKey, supportEmail);

      return NextResponse.json({ message: 'SupportEmail updated successfully' });
    }
  } catch (error) {
    console.error('Error updating SupportEmail:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

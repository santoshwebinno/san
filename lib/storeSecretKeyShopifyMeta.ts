import shopify from '@/lib/shopify';

export async function storeSecretKeyInMetafield(session: any, secretKey: string) {
  try {
    // Create a Shopify REST client using the session
    const client = new shopify.clients.Rest({ session });

    // Store the secret_key in Shopify metafields under a custom namespace
    const metafield = await client.post({
      path: 'metafields',
      data: {
        metafield: {
          namespace: 'custom', // You can change the namespace to something appropriate
          key: 'secret_key',   // The key name for the secret_key
          value: secretKey,    // The actual secret key value to store
          type: 'single_line_text_field', // Type of the metafield (e.g., string)
        },
      },
    });

    console.log('Secret key successfully stored in Shopify metafield:', metafield.body.metafield);

    return metafield.body.metafield;
  } catch (error) {
    console.error('Failed to store secret key in Shopify metafield:', error);
    throw new Error('Metafield storage failed');
  }
}


export async function getSecretKeyFromMetafield(session: any) {
  try {
    // Create a Shopify REST client using the session
    const client = new shopify.clients.Rest({ session });

    // Fetch the secret_key metafield from Shopify
    const response = await client.get({
      path: 'metafields',
      query: {
        namespace: 'custom',
        key: 'secret_key',
      },
    });

    const metafield = response.body.metafields[0]; // Assuming there's only one result

    if (metafield && metafield.value) {
      console.log('Secret key retrieved from Shopify metafield:', metafield.value);
      return metafield.value;
    } else {
      console.warn('No secret key found in Shopify metafield');
      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve secret key from Shopify metafield:', error);
    throw new Error('Metafield retrieval failed');
  }
}

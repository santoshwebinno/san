const appUninstallHandler = async (
  topic: string,
  shop: string,
  webhookRequestBody: string
): Promise<void> => {
  const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;

  if (!upstashRedisRestUrl) {
    throw new Error('UPSTASH_REDIS_REST_URL is not defined');
  }

  const headers = {
    Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const webhookBody = JSON.parse(webhookRequestBody);

  async function deleteKeys() {
    try {
      const keysResponse = await fetch(`${upstashRedisRestUrl}/keys/*`, {
        headers,
      });

      if (!keysResponse.ok) {
        throw new Error('Failed to retrieve keys from Upstash');
      }

      const keys = await keysResponse.json();

      for (const key of keys.result) {
        const valueResponse = await fetch(`${upstashRedisRestUrl}/get/${key}`, {
          method: 'GET',
          headers,
        });

        if (!valueResponse.ok) {
          console.error(`Failed to get value for key ${key}`);
          continue;
        }

        const value = await valueResponse.text();
        console.log('Value: ', value);

        if (value.includes(shop)) {
          console.log(`Deleting key: ${key}`);

          const deleteResponse = await fetch(`${upstashRedisRestUrl}/del/${key}`, {
            method: 'DELETE',
            headers,
          });

          if (!deleteResponse.ok) {
            console.error(`Failed to delete key ${key}`);
          }
        }
      }
    } catch (error) {
      console.error('Error in deleteKeys function:', error);
    }
  }

  console.log('App Uninstalled from', shop);

  await deleteKeys();
};

export default appUninstallHandler;
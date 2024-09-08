type WebhookHandler = (topic: string, shop: string, body: string) => Promise<void>;

interface WebhookConfig {
  path: string;
  webhookHandler: WebhookHandler;
}

interface Webhooks {
  APP_UNINSTALLED: WebhookConfig;
}

const webhooks: Webhooks = {
  APP_UNINSTALLED: {
    path: '/api/webhooks',
    webhookHandler: async (topic, shop, body) => {
      console.log('App uninstalled old way');
      // Implement your old webhook handling logic here
    },
  },
};

export default webhooks;

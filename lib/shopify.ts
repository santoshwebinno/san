import { ApiVersion, DeliveryMethod, shopifyApi } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/web-api'; // Use Web API adapter for compatibility with Next.js App Router
import appUninstallHandler from '../webhooks/app_uninstalled';

// Initialize the Shopify API client with your app's credentials
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || '',
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY || '',
  scopes: process.env.SCOPES?.split(',') || [],
  hostName: process.env.SHOPIFY_APP_URL?.replace(/https:\/\//, '') || '',
  isEmbeddedApp: false,
  apiVersion: ApiVersion.July23,
  hostScheme: 'https',
  logger: { level: 0 }, // Adjust logging level as needed
});

// Register webhooks using the Web API adapter
shopify.webhooks.addHandlers({
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: '/api/webhooks/app_uninstalled',
    callback: appUninstallHandler,
  },
});

export default shopify;
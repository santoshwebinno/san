## Documentation for app/api/auth/callback/route.ts
File: app/api/auth/callback/route.ts
Purpose:

This file handles the OAuth callback from Shopify. After the merchant is redirected back to your app from Shopify, this handler processes the authorization, stores the session, and registers the necessary webhooks.
Key Processes:

OAuth Callback Handling:

Receives the OAuth callback from Shopify and processes it using shopify.auth.callback.
Stores the resulting session using customSessionHandler.storeSession.
Webhook Registration:

Registers webhooks using the authenticated session.
Logs the status of webhook registration.
Redirection:

Redirects the merchant to the app's main page after successful authentication.
Environment Variables:

Utilizes Shopify API keys and session management handled via environment variables.
Location in Project:

Directory: app/api/auth/callback/
File: route.ts

## Documentation for app/api/auth/index/route.ts
File: app/api/auth/index/route.ts
Purpose:

This file initiates the OAuth flow by redirecting the merchant to Shopify’s authorization page.
Key Processes:

OAuth Flow Initiation:
Starts the OAuth process with Shopify using shopify.auth.begin.
Redirects to Shopify’s authorization URL.
Shop Parameter:
Extracts the shop parameter from the request to identify which Shopify store is being authorized.
Redirection:

Redirects the user to Shopify's authorization page.
If the shop parameter is missing, redirects the user to the login page.
Location in Project:

Directory: app/api/auth/index/
File: route.ts

## Documentation for app/api/auth/offline-callback/route.ts
File: app/api/auth/offline-callback/route.ts
Purpose:

Handles the OAuth callback for offline access tokens, which are used for background jobs or tasks that don't require a user's presence.
Key Processes:

OAuth Callback Handling:
Processes the callback from Shopify using shopify.auth.callback.
Redirection:
Redirects the merchant to the main authentication route with the relevant parameters after processing the offline token.
Location in Project:

Directory: app/api/auth/offline-callback/
File: route.ts

## Documentation for app/api/auth/offline/route.ts
File: app/api/auth/offline/route.ts
Purpose:

This file initiates the OAuth flow for offline access, which provides a long-lived token for the Shopify store that your app can use even when the store owner is not actively using the app.
Key Processes:

Offline OAuth Flow Initiation:
Starts the OAuth process for offline access tokens using shopify.auth.begin.
Redirects to Shopify’s authorization page for offline access.
Redirection:

Redirects the user to the appropriate Shopify authorization page for offline token generation.
Location in Project:

Directory: app/api/auth/offline/
File: route.ts


## Documentation for app/api/webhooks/[...webhookTopic]/route.ts
File: app/api/webhooks/[...webhookTopic]/route.ts
Purpose:

This file handles incoming Shopify webhooks. It processes webhook topics dynamically and ensures that the correct actions are taken based on the type of event received.
Key Processes:

Webhook Handling:

Listens for incoming POST requests containing Shopify webhook data.
Processes the webhook payload using shopify.webhooks.process.
Dynamic Topic Handling:

Dynamically identifies the webhook topic from request headers.
Error Handling:

Logs any errors that occur during the processing of webhooks and returns appropriate HTTP status codes.
Configuration:

config.api.bodyParser: Set to false to allow Shopify’s raw webhook payload to be processed correctly.
Location in Project:

Directory: app/api/webhooks/[...webhookTopic]/
File: route.ts

## Documentation for app/api/graphql/route.ts
File: app/api/graphql/route.ts
Purpose:

Proxies GraphQL requests from your app to Shopify, ensuring they are properly authenticated with the current session.
Key Processes:

Session Management:
Retrieves the current session ID using shopify.session.getCurrentId.
Loads the session using customSessionHandler.loadSession.
GraphQL Proxying:
Forwards the GraphQL request to Shopify using the session credentials.
Error Handling:

Captures and logs any errors that occur during the request and returns an appropriate response.
Location in Project:

Directory: app/api/graphql/
File: route.ts

## Documentation for app/api/hello/route.ts
File: app/api/hello/route.ts
Purpose:

A simple API endpoint that responds with a static message, typically used for testing or as a basic example of an API route.
Key Processes:

GET Request Handling:
Returns a JSON response with a greeting message.
Location in Project:

Directory: app/api/hello/
File: route.ts
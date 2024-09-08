## Documentation for customSessionCli3.ts
File: lib/customSessionCli3.ts
Purpose:

The customSessionCli3.ts file is responsible for managing session data for Shopify stores. It handles the storage, retrieval, and deletion of session information using Upstash Redis.
Key Functions:

loadSession(id: string): Promise<Session>

Description: Retrieves a session from Upstash Redis based on the session ID.
Usage: This function is called when the app needs to load session data, such as during the OAuth process or when handling requests.
Returns: A Session object parsed from the stored JSON data.
storeSession(session: Session): Promise<boolean>

Description: Stores a session in Upstash Redis. If the session is not for offline access, it includes an expiration time of 300 seconds.
Usage: This function is called to save session data after it's created or updated.
Returns: true if the session was successfully stored, otherwise false.
deleteSession(id: string): Promise<boolean>

Description: Deletes a session from Upstash Redis based on the session ID.
Usage: This function is used to clean up sessions, particularly when a shop uninstalls the app or a session is no longer needed.
Returns: true if the session was successfully deleted, otherwise false.
Environment Variables:

UPSTASH_REDIS_REST_URL: The base URL for the Upstash Redis instance.
UPSTASH_REDIS_REST_TOKEN: The authentication token for accessing the Upstash Redis API.
Placement in Project:

Location: lib/customSessionCli3.ts
Dependencies: This module depends on environment variables for Upstash Redis and interacts with Shopify sessions.


## Documentation for shopify.ts
File: lib/shopify.ts
Purpose:

The shopify.ts file is central to the app’s integration with Shopify. It initializes the Shopify API, manages webhook registrations, and provides the necessary configurations for the app to interact with Shopify stores.
Core Configuration:

Shopify API Initialization:
The Shopify API is initialized with the app’s API key, secret, scopes, host name, and API version (July23).
The app is configured as a non-embedded app, suitable for serverless, standalone Shopify apps.
Key Components:

shopifyApi Object:

Description: The main object used for making API calls to Shopify. It’s initialized with the app's credentials and configurations.
Usage: Used throughout the app wherever interactions with Shopify are needed, such as during OAuth, making REST or GraphQL calls, and more.
Webhook Handlers:

APP_UNINSTALLED: This webhook handler listens for the APP_UNINSTALLED event, which is triggered when a merchant uninstalls the app.
Callback URL: The callback URL is set to /api/webhooks/app_uninstalled, and the appUninstallHandler function is invoked to handle this event.
Environment Variables:

SHOPIFY_API_KEY: The API key for the Shopify app.
SHOPIFY_API_SECRET_KEY: The secret key for the Shopify app.
SCOPES: A comma-separated list of OAuth scopes required by the app.
HOST: The base URL of the app, which is critical for constructing redirect URLs and making API requests.
Placement in Project:

Location: lib/shopify.ts
Dependencies: This module depends on environment variables for the Shopify API and the app's configuration.
import pg from "pg";
import { Session as ShopifySession } from "@shopify/shopify-api";
import { on } from "stream";

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "node_project",
  password: "admin",
  port: 5433
});
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL || 'postgresql://postgres:admin@localhost:5432/nodePrject',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
export const checkClientExists = async (
  session: ShopifySession
): Promise<{ exists: boolean; userCreated?: boolean; secret_key?:string}> => {
  const query = "SELECT 1 FROM clients WHERE client_code = $1 LIMIT 1";
  try {
    const res = await pool.query(query, [session.shop]);

    if (res.rows.length > 0) {
      // Client exists
      return { exists: true };
    } else {
      // Client does not exist, call the register API
      console.log("Client does not exist, attempting to register...");
      console.log(
        "🚀 ~ file: customSessionCli3.ts:38 ~ checkClientExists ~ shop:",
        session.shop
      );

      console.log(
        "🚀 ~ file: customSessionCli3.ts:38 ~ checkClientExists ~ last_name:",
        session.onlineAccessInfo?.associated_user?.last_name
      );

      console.log(
        "🚀 ~ file: customSessionCli3.ts:38 ~ checkClientExists ~ first_name:",
        session.onlineAccessInfo?.associated_user?.first_name
      );
      const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
      const response = await fetch(
        `${process.env.SHOPIFY_APP_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: `abhinavshopifytest3+${timestamp}@email.ghostinspector.com`, //! replace with this in development session.onlineAccessInfo?.associated_user?.email
            first_name: session.onlineAccessInfo?.associated_user?.first_name,
            last_name: session.onlineAccessInfo?.associated_user?.last_name,
            display_name: session.onlineAccessInfo?.associated_user?.first_name,
            source: "Shopify",
            domain: session.shop,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Assume the API returns { success: true } on successful creation
        if (result.success) {
          return { exists: false, userCreated: true,secret_key:result.secret_key };
        } else {
          return { exists: false, userCreated: false,secret_key:'' };
        }
      } else {
        console.error("Failed to register user:", response);
        return { exists: false, userCreated: false };
      }
    }
  } catch (error) {
    console.error(
      "Error checking client existence or registering user:",
      error
    );
    return { exists: false, userCreated: false, secret_key:'' };
  }
};

// Function to create the session table if it doesn't exist
// Function to create the session table if it doesn't exist
export const createSessionTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Sessions (
      id VARCHAR(255) PRIMARY KEY,
      shop VARCHAR(255) NOT NULL,
      state VARCHAR(255),
      isOnline BOOLEAN NOT NULL,
      scope VARCHAR(255),
      expiresAt TIMESTAMPTZ,
      accessToken VARCHAR(255) NOT NULL,
      expiresIn INTEGER,
      associatedUserId BIGINT,
      associatedUserFirstName VARCHAR(255),
      associatedUserLastName VARCHAR(255),
      associatedUserEmail VARCHAR(255),
      associatedUserScope VARCHAR(255),
      associatedUserAccountOwner BOOLEAN,
      associatedUserLocale VARCHAR(255),
      associatedUserCollaborator BOOLEAN,
      associatedUserEmailVerified BOOLEAN,
      sessionData JSONB,
      createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("Session table created or verified successfully.");
  } catch (error) {
    console.error("Error creating/verifying Session table:", error);
  }
};

// Store or update the session in the database
const storeSession = async (session: ShopifySession): Promise<boolean> => {
  const query = `
    INSERT INTO Sessions (
      id, shop, state, isOnline, scope, expiresAt, accessToken, expiresIn,
      associatedUserId, associatedUserFirstName, associatedUserLastName, associatedUserEmail,
      associatedUserScope, associatedUserAccountOwner, associatedUserLocale, associatedUserCollaborator,
      associatedUserEmailVerified, sessionData, createdAt, updatedAt
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    ON CONFLICT (id)
    DO UPDATE SET
      shop = EXCLUDED.shop,
      state = EXCLUDED.state,
      isOnline = EXCLUDED.isOnline,
      scope = EXCLUDED.scope,
      expiresAt = EXCLUDED.expiresAt,
      accessToken = EXCLUDED.accessToken,
      expiresIn = EXCLUDED.expiresIn,
      associatedUserId = EXCLUDED.associatedUserId,
      associatedUserFirstName = EXCLUDED.associatedUserFirstName,
      associatedUserLastName = EXCLUDED.associatedUserLastName,
      associatedUserEmail = EXCLUDED.associatedUserEmail,
      associatedUserScope = EXCLUDED.associatedUserScope,
      associatedUserAccountOwner = EXCLUDED.associatedUserAccountOwner,
      associatedUserLocale = EXCLUDED.associatedUserLocale,
      associatedUserCollaborator = EXCLUDED.associatedUserCollaborator,
      associatedUserEmailVerified = EXCLUDED.associatedUserEmailVerified,
      sessionData = EXCLUDED.sessionData,
      updatedAt = CURRENT_TIMESTAMP;
  `;

  const values = [
    session.id,
    session.shop,
    session.state,
    session.isOnline,
    session.scope,
    session.expires ? new Date(session.expires) : null,
    session.accessToken || "",
    session.onlineAccessInfo?.expires_in || null,
    session.onlineAccessInfo?.associated_user?.id || null,
    session.onlineAccessInfo?.associated_user?.first_name || null,
    session.onlineAccessInfo?.associated_user?.last_name || null,
    session.onlineAccessInfo?.associated_user?.email || null,
    session.onlineAccessInfo?.associated_user_scope || null,
    session.onlineAccessInfo?.associated_user?.account_owner || null,
    session.onlineAccessInfo?.associated_user?.locale || null,
    session.onlineAccessInfo?.associated_user?.collaborator || null,
    session.onlineAccessInfo?.associated_user?.email_verified || null,
    JSON.stringify(session),
  ];

  try {
    await pool.query(query, values);
    console.log(`Session stored in PostgreSQL for id ${session.id}`);
    return true;
  } catch (error) {
    console.error(`Error storing session with id ${session.id}:`, error);
    return false;
  }
};

// Load the session from the database
const loadSession = async (
  id: string,
  onlyshop = false
): Promise<ShopifySession | string | null> => {
  const query = onlyshop
    ? "SELECT shop FROM Sessions WHERE id = $1"
    : "SELECT sessionData FROM Sessions WHERE id = $1";

  try {
    const res = await pool.query(query, [id]);

    if (res.rows.length === 0) {
      console.error(`Session with id ${id} not found`);
      return null;
    }

    if (onlyshop) {
      const shop = res.rows[0].shop;
      console.log(`Shop loaded from PostgreSQL for id ${id}`);
      return shop;
    } else {
      const sessionData = res.rows[0].sessiondata;
      console.log(`Session loaded from PostgreSQL for id ${id}`);
      return typeof sessionData === "string"
        ? (JSON.parse(sessionData) as ShopifySession)
        : (sessionData as ShopifySession);
    }
  } catch (error) {
    console.error(`Error loading session with id ${id}:`, error);
    return null;
  }
};

// Delete the session from the database
const deleteSession = async (id: string): Promise<boolean> => {
  const query = "DELETE FROM Sessions WHERE id = $1";

  try {
    const res: any = await pool.query(query, [id]);

    if (res.rowCount > 0) {
      console.log(`Session deleted from PostgreSQL for id ${id}`);
      return true;
    } else {
      console.error(`Session with id ${id} not found`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting session with id ${id}:`, error);
    return false;
  }
};

// Initialize the session table
createSessionTable();

const customSessionHandler = { storeSession, loadSession, deleteSession };

export default customSessionHandler;

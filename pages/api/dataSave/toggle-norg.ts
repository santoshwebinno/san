import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Setup PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node_project',
  password: 'admin',
  port: 5433,
});

// Function to create `scripts_table` if it doesn't exist
const createScriptsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS scripts_table (
      id SERIAL PRIMARY KEY,
      shop TEXT UNIQUE NOT NULL,
      script_code TEXT NOT NULL,
      enabled BOOLEAN NOT NULL,
      createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(query).catch((error) => {
    console.error('Error creating/verifying scripts table:', error);
    throw error;
  });

  console.log('Scripts table created or verified successfully.');
};

// Initialize the table on startup
createScriptsTable().catch((error) =>
  console.error('Failed to initialize database:', error)
);

// Helper function for running queries
const runQuery = async (query: string, values: any[]) => {
  try {
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// API route handler
interface ScriptData {
  enabled: boolean;
  scriptCode: string;
  shop: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json(`Method ${req.method} Not Allowed`);
  }

  const { enabled, scriptCode, shop }: ScriptData = req.body;

  // Validate input data
  if (typeof enabled !== 'boolean' || typeof scriptCode !== 'string' || typeof shop !== 'string') {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    // Insert data into the database
    const insertQuery = `
      INSERT INTO scripts_table (enabled, script_code, shop)
      VALUES ($1, $2, $3)
      ON CONFLICT (shop) 
      DO UPDATE SET
        enabled = EXCLUDED.enabled,
        script_code = EXCLUDED.script_code,
        updatedAt = CURRENT_TIMESTAMP
      RETURNING id;
    `;

    const result = await runQuery(insertQuery, [enabled, scriptCode, shop]);

    return res.status(200).json({
      message: 'Data saved successfully',
      id: result.rows[0].id,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

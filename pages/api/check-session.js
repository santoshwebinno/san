import { Pool } from 'pg';

// Create a new pool of connections (configure as per your PostgreSQL setup)
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "node_project",
  password: "admin",
  port: 5433
});

// Function to query the session table for the shop name
async function querySession(shop) {
  const queryText = 'SELECT * FROM sessions WHERE shop = $1';
  try {
    const result = await pool.query(queryText, [shop]);

    // If any rows are returned, the shop already exists
    if (result.rows.length > 0) {
      return result.rows[0]; // Return the session data
    }

    return null; // No session found for this shop
  } catch (error) {
    console.error('Error querying session:', error);
    throw error; // Let the caller handle the error
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { shop } = req.body;
    shop = `${shop}.myshopify.com`; // Reassigning the value
    try {
      // Check the session table to see if the user exists
      const session = await querySession(shop);

      if (session) {
        res.status(400).json({ message: 'User already installed the app' });
      } else {
        res.status(200).json({ message: 'User can install the app' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // Only allow POST
  }
}

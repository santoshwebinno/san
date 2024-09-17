import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';
import Cors from 'cors';

// Setup PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node_project',
  password: 'admin',
  port: 5433,
});

// Initialize the cors middleware
const cors = Cors({
  origin: ['https://speed-test-h.myshopify.com'], // Allow your Shopify store
  methods: ['GET', 'HEAD'], // Specify allowed methods
  allowedHeaders: ['Content-Type'],
});

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

// Helper function to run the cors middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    try {
      // Extract the `shop` value from the request body
      const { shop } = req.body;
  
      // Define the query to fetch script data from the `scripts_table`
      const query = `
        SELECT * FROM scripts_table 
        WHERE shop = $1 AND enabled = TRUE;
      `;
  
      // Run the query with `shop` as the parameter
      const result = await runQuery(query, [shop]);
  
      // Check if we got any rows back
      if (result.rows.length > 0) {
        // Assuming only one record is expected, get the first one
        const data = result.rows[0];
  
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ message: 'No data found' });
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  
}

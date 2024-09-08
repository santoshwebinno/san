
import { createSessionTable } from '@/lib/customSessionCli3';
import { NextResponse } from 'next/server';

  export async function GET() {
    console.log('Received GET request for /api/sync-db');
    
    try {
      console.log('Starting database synchronization...');
      await createSessionTable();
      console.log('Database synchronization completed successfully.');
      
      return NextResponse.json({ message: 'Database synchronized successfully.' });
    } catch (error: any) {
      console.error('Error occurred during database synchronization:', error.message);
      console.error('Error stack trace:', error.stack);
      
      return NextResponse.json({ 
        error: 'Error synchronizing the database.', 
        details: error.message 
      }, { status: 500 });
    }
  }

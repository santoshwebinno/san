import customSessionHandler from '@/lib/customSessionCli3';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const stored = await customSessionHandler.storeSession(body);
    if (!stored) {
      return NextResponse.json({ error: 'Failed to store session' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Session stored successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error storing session' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const onlyshop = true;
    const shop = await customSessionHandler.loadSession(id, onlyshop);

    if (!shop) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    return NextResponse.json({ session: shop });
  } catch (error) {
    console.error('Error loading session:', error);
    return NextResponse.json({ error: 'Error loading session' }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const deleted = await customSessionHandler.deleteSession(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Session deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting session' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import SystemLog from '../../../models/SystemLog';

export async function GET() {
  try {
    await connectToDatabase();
    const logs = await SystemLog.find().sort({ timestamp: -1 }).limit(50);
    return NextResponse.json({ logs });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

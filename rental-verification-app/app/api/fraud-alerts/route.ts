import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import FraudDetection from '../../../models/FraudDetection';

export async function GET() {
  try {
    await connectToDatabase();
    const alerts = await FraudDetection.find().sort({ detected_date: -1 });
    return NextResponse.json({ alerts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const { alert_id, fraud_status, reviewed_by } = await req.json();

    const updated = await FraudDetection.findByIdAndUpdate(
      alert_id,
      { fraud_status, reviewed_by },
      { new: true }
    );

    return NextResponse.json({ message: 'Fraud alert updated', alert: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

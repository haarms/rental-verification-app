import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import LandlordVerification from '../../../../models/LandlordVerification';

export async function GET() {
  try {
    await connectToDatabase();
    const verifications = await LandlordVerification.find().sort({ verification_date: -1 });
    return NextResponse.json({ verifications });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { landlord_id, landlord_name, ownership_information } = body;

    const record = await LandlordVerification.create({
      landlord_id,
      landlord_name,
      ownership_information,
      verification_status: 'Verified', // Auto-verify for demo or set to Pending
      verification_date: new Date()
    });

    return NextResponse.json({ message: 'Landlord verification approved', record }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

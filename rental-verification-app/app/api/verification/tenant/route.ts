import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import TenantVerification from '../../../../models/TenantVerification';

export async function GET() {
  try {
    await connectToDatabase();
    const verifications = await TenantVerification.find().sort({ verification_date: -1 });
    return NextResponse.json({ verifications });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { tenant_id, tenant_name, occupation, employer_information, monthly_income, guarantor_name, guarantor_phone } = body;

    const record = await TenantVerification.create({
      tenant_id,
      tenant_name,
      occupation,
      employer_information,
      monthly_income,
      guarantor_name,
      guarantor_phone,
      verification_status: 'Pending'
    });

    return NextResponse.json({ message: 'Tenant verification details submitted', record }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import RentalAgreement from '../../../models/RentalAgreement';
import Property from '../../../models/Property';
import FraudDetection from '../../../models/FraudDetection';

export async function GET() {
  try {
    await connectToDatabase();
    const agreements = await RentalAgreement.find().populate('tenant_id landlord_id property_id');
    return NextResponse.json({ agreements });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { tenant_id, landlord_id, property_id, tenancy_duration, rent_amount, agreement_terms, start_date, expiry_date, witness_info } = body;

    // Rent Rate Discrepancy Check
    const property = await Property.findById(property_id);
    if (property && Math.abs(property.rental_price - rent_amount) > property.rental_price * 0.25) {
      await FraudDetection.create({
        user_id: landlord_id,
        property_id: property_id,
        suspicious_activity_type: 'Rent Rate Discrepancy',
        description: `Agreement rent (\$${rent_amount}) deviates by >25% from listed price (\$${property.rental_price}).`,
        fraud_status: 'Flagged'
      });
    }

    const agreement_hash = 'HASH_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

    const agreement = await RentalAgreement.create({
      tenant_id,
      landlord_id,
      property_id,
      tenancy_duration,
      rent_amount,
      agreement_terms,
      start_date,
      expiry_date,
      witness_info,
      agreement_hash,
      agreement_status: 'Active'
    });

    return NextResponse.json({ message: 'Rental Agreement generated & signed', agreement }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

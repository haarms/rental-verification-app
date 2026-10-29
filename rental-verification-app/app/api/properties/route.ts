import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Property from '../../../models/Property';
import { checkAddressCollision, checkLandlordVerification, normalizeAddress } from '../../../lib/fraudEngine';

export async function GET() {
  try {
    await connectToDatabase();
    const properties = await Property.find().sort({ upload_date: -1 });
    return NextResponse.json({ properties });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { landlord_id, landlord_name, property_title, property_type, property_location, property_address, description, number_of_rooms, rental_price } = body;

    // 1. Landlord Verification Check
    const isLandlordVerified = await checkLandlordVerification(landlord_id);
    if (!isLandlordVerified) {
      return NextResponse.json({
        error: 'Listing Blocked: Your Landlord status is not yet verified by an Estate Manager.',
        flagged: true
      }, { status: 403 });
    }

    // 2. Address Collision Check
    const collisionCheck = await checkAddressCollision(property_address, landlord_id);
    if (collisionCheck.isCollision) {
      return NextResponse.json({
        error: 'FRAUD ALERT TRIGGERED: Address Collision Detected! This exact property address has already been listed under another landlord record.',
        flagged: true,
        existingProperty: collisionCheck.existingProperty
      }, { status: 409 });
    }

    const normalized_address = normalizeAddress(property_address);

    const newProperty = await Property.create({
      landlord_id,
      landlord_name,
      property_title,
      property_type,
      property_location,
      property_address,
      normalized_address,
      description,
      number_of_rooms,
      rental_price,
      property_status: 'Available'
    });

    return NextResponse.json({ message: 'Property listed successfully', property: newProperty }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

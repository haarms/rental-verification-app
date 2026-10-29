import Property from '../models/Property';
import User from '../models/User';
import LandlordVerification from '../models/LandlordVerification';
import FraudDetection from '../models/FraudDetection';
import SystemLog from '../models/SystemLog';

export function normalizeAddress(address: string): string {
  return address
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function checkAddressCollision(address: string, landlordId: string) {
  const norm = normalizeAddress(address);
  const existing = await Property.findOne({
    normalized_address: norm,
    landlord_id: { $ne: landlordId },
  });

  if (existing) {
    await FraudDetection.create({
      user_id: landlordId,
      property_id: existing._id,
      suspicious_activity_type: 'Address Collision',
      description: `Attempted duplicate property listing for address: "${address}". Already registered by landlord ID: ${existing.landlord_id}`,
      duplicate_record_info: `Existing Property ID: ${existing._id}, Registered Title: ${existing.property_title}`,
      fraud_status: 'Flagged',
    });

    await SystemLog.create({
      activity_type: 'FRAUD_ALERT_ADDRESS_COLLISION',
      activity_description: `Address collision detected for address: ${address}`,
    });

    return { isCollision: true, existingProperty: existing };
  }

  return { isCollision: false };
}

export async function checkDuplicateNIN(nationalId: string, currentUserId?: string) {
  const query: any = { national_id: nationalId };
  if (currentUserId) {
    query._id = { $ne: currentUserId };
  }

  const existing = await User.findOne(query);

  if (existing) {
    await FraudDetection.create({
      user_id: currentUserId,
      suspicious_activity_type: 'Duplicate Identity / NIN',
      description: `National Identity Number (NIN) "${nationalId}" is already registered to user "${existing.full_name}" (${existing.username}).`,
      duplicate_record_info: `Existing User ID: ${existing._id}, Email: ${existing.email}`,
      fraud_status: 'Flagged',
    });

    return { isDuplicate: true, existingUser: existing };
  }

  return { isDuplicate: false };
}

export async function checkLandlordVerification(landlordId: string) {
  const record = await LandlordVerification.findOne({ landlord_id: landlordId });
  if (!record || record.verification_status !== 'Verified') {
    await FraudDetection.create({
      user_id: landlordId,
      suspicious_activity_type: 'Unverified Landlord Listing',
      description: `Landlord ID ${landlordId} attempted to post a property listing without a verified identity or title deed.`,
      fraud_status: 'Flagged',
    });

    return false;
  }
  return true;
}

import mongoose, { Schema, Document } from 'mongoose';

export interface IFraudDetection extends Document {
  user_id?: mongoose.Types.ObjectId;
  property_id?: mongoose.Types.ObjectId;
  suspicious_activity_type: 'Address Collision' | 'Duplicate Identity / NIN' | 'Unverified Landlord Listing' | 'Rent Rate Discrepancy' | 'Unauthorized Modification';
  description: string;
  duplicate_record_info?: string;
  unauthorized_modification_details?: string;
  fraud_status: 'Flagged' | 'UnderReview' | 'Resolved' | 'Dismissed';
  detected_date: Date;
  reviewed_by?: string;
}

const FraudDetectionSchema: Schema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  property_id: { type: Schema.Types.ObjectId, ref: 'Property' },
  suspicious_activity_type: { type: String, required: true },
  description: { type: String, required: true },
  duplicate_record_info: { type: String },
  unauthorized_modification_details: { type: String },
  fraud_status: { type: String, enum: ['Flagged', 'UnderReview', 'Resolved', 'Dismissed'], default: 'Flagged' },
  detected_date: { type: Date, default: Date.now },
  reviewed_by: { type: String },
});

export default mongoose.models.FraudDetection || mongoose.model<IFraudDetection>('FraudDetection', FraudDetectionSchema);

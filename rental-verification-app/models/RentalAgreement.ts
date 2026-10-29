import mongoose, { Schema, Document } from 'mongoose';

export interface IRentalAgreement extends Document {
  tenant_id: mongoose.Types.ObjectId;
  landlord_id: mongoose.Types.ObjectId;
  property_id: mongoose.Types.ObjectId;
  agreement_date: Date;
  tenancy_duration: string; // e.g. "12 Months"
  rent_amount: number;
  agreement_terms: string;
  start_date: Date;
  expiry_date: Date;
  digital_signature?: string;
  witness_info: string;
  agreement_hash: string;
  agreement_status: 'Draft' | 'Active' | 'Expired' | 'Revoked';
}

const RentalAgreementSchema: Schema = new Schema({
  tenant_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  landlord_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  property_id: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  agreement_date: { type: Date, default: Date.now },
  tenancy_duration: { type: String, required: true },
  rent_amount: { type: Number, required: true },
  agreement_terms: { type: String, required: true },
  start_date: { type: Date, required: true },
  expiry_date: { type: Date, required: true },
  digital_signature: { type: String },
  witness_info: { type: String, required: true },
  agreement_hash: { type: String, required: true },
  agreement_status: { type: String, enum: ['Draft', 'Active', 'Expired', 'Revoked'], default: 'Active' },
});

export default mongoose.models.RentalAgreement || mongoose.model<IRentalAgreement>('RentalAgreement', RentalAgreementSchema);

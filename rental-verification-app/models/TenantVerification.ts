import mongoose, { Schema, Document } from 'mongoose';

export interface ITenantVerification extends Document {
  tenant_id: mongoose.Types.ObjectId;
  tenant_name: string;
  occupation: string;
  employer_information: string;
  monthly_income: number;
  guarantor_name: string;
  guarantor_phone: string;
  id_document_url?: string;
  passport_photo_url?: string;
  verification_status: 'Pending' | 'Verified' | 'Rejected';
  verification_date?: Date;
}

const TenantVerificationSchema: Schema = new Schema({
  tenant_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  tenant_name: { type: String, required: true },
  occupation: { type: String, required: true },
  employer_information: { type: String, required: true },
  monthly_income: { type: Number, required: true },
  guarantor_name: { type: String, required: true },
  guarantor_phone: { type: String, required: true },
  id_document_url: { type: String },
  passport_photo_url: { type: String },
  verification_status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  verification_date: { type: Date },
});

export default mongoose.models.TenantVerification || mongoose.model<ITenantVerification>('TenantVerification', TenantVerificationSchema);

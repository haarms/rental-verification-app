import mongoose, { Schema, Document } from 'mongoose';

export interface ILandlordVerification extends Document {
  landlord_id: mongoose.Types.ObjectId;
  landlord_name: string;
  ownership_information: string;
  ownership_document_url?: string;
  id_document_url?: string;
  verification_status: 'Pending' | 'Verified' | 'Rejected';
  verification_date?: Date;
}

const LandlordVerificationSchema: Schema = new Schema({
  landlord_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  landlord_name: { type: String, required: true },
  ownership_information: { type: String, required: true },
  ownership_document_url: { type: String },
  id_document_url: { type: String },
  verification_status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  verification_date: { type: Date },
});

export default mongoose.models.LandlordVerification || mongoose.model<ILandlordVerification>('LandlordVerification', LandlordVerificationSchema);

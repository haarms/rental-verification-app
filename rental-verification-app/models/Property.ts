import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  landlord_id: mongoose.Types.ObjectId;
  landlord_name: string;
  property_title: string;
  property_type: 'Apartment' | 'Duplex' | 'Terrace' | 'Self-Contain' | 'Commercial';
  property_location: string;
  property_address: string;
  normalized_address: string;
  description: string;
  number_of_rooms: number;
  rental_price: number;
  property_status: 'Available' | 'Occupied' | 'UnderReview';
  property_image?: string;
  upload_date: Date;
}

const PropertySchema: Schema = new Schema({
  landlord_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  landlord_name: { type: String, required: true },
  property_title: { type: String, required: true },
  property_type: { type: String, required: true },
  property_location: { type: String, required: true },
  property_address: { type: String, required: true },
  normalized_address: { type: String, required: true, index: true },
  description: { type: String },
  number_of_rooms: { type: Number, required: true },
  rental_price: { type: Number, required: true },
  property_status: { type: String, enum: ['Available', 'Occupied', 'UnderReview'], default: 'Available' },
  property_image: { type: String },
  upload_date: { type: Date, default: Date.now },
});

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);

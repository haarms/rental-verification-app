import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  full_name: string;
  username: string;
  password_hash: string;
  gender: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  residential_address: string;
  national_id: string; // NIN
  id_type: string;
  user_role: 'Tenant' | 'Landlord' | 'EstateManager' | 'Admin';
  profile_photo?: string;
  id_document?: string;
  registration_date: Date;
}

const UserSchema: Schema = new Schema({
  full_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  gender: { type: String },
  date_of_birth: { type: String },
  phone_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  residential_address: { type: String, required: true },
  national_id: { type: String, required: true, index: true },
  id_type: { type: String, default: 'NIN' },
  user_role: { type: String, enum: ['Tenant', 'Landlord', 'EstateManager', 'Admin'], required: true },
  profile_photo: { type: String },
  id_document: { type: String },
  registration_date: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

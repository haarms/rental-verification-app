import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemLog extends Document {
  admin_id?: mongoose.Types.ObjectId;
  activity_type: string;
  activity_description: string;
  ip_address?: string;
  timestamp: Date;
}

const SystemLogSchema: Schema = new Schema({
  admin_id: { type: Schema.Types.ObjectId, ref: 'User' },
  activity_type: { type: String, required: true },
  activity_description: { type: String, required: true },
  ip_address: { type: String, default: '127.0.0.1' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.SystemLog || mongoose.model<ISystemLog>('SystemLog', SystemLogSchema);

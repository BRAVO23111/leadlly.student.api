import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId; 
  order_id: string; 
  planId: string; 
  duration: number; 
  categogy: 'basic' | 'pro' | 'premium' | 'free' | null;
  coupon?: string; 
}

const OrderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  order_id: { type: String, required: true },
  planId: { type: String },
  duration: { type: Number },
  category: { type: String, enum: [ 'basic', 'pro', 'premium', 'free'  ]},
  coupon: { type: String },
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);

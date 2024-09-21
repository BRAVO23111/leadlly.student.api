import mongoose, { Schema, Document } from 'mongoose';

interface IToken extends Document {
  user: mongoose.Types.ObjectId; 
  push_token: string; 
  createdAt: Date
}

const tokenSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  push_token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Push_Token = mongoose.model<IToken>('PushToken', tokenSchema);

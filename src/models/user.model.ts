/* eslint-disable import/prefer-default-export */
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
});

export const User = model<IUser>('User', userSchema);

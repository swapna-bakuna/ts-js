import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser{
  id: any;
  data?: any;
  roles?: 'user' | 'admin';
  email?: string;
  password?: string;
}

const userSchema: Schema = new Schema({
  roles: {
    type: String,
    enum: ['user', 'admin']
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  }
});
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
export default mongoose.model<IUser>('User', userSchema);
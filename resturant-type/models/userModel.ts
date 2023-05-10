import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  roles: 'user' | 'admin';
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  password(password: any, password1: any): unknown;
  id: any;
}

const userSchema = new mongoose.Schema(
  {
    roles: {
      type: String,
      enum: ['user', 'admin'],
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
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
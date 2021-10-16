import Mongoose from 'mongoose';

export interface User {
  _id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const userSchema = new Mongoose.Schema(
  {
    _id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 256,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export type UserDocument = Mongoose.Document & User;

export const UserEntity = Mongoose.model<UserDocument>('users', userSchema);

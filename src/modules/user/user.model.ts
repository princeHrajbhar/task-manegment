import mongoose, { Schema } from "mongoose";
import { UserRole } from "./user.interface.js";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.MEMBER,
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
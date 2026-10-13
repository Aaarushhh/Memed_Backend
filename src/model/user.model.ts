import mongoose, { Schema } from "mongoose";
import { UserRole } from "../util/enum/common.enum";
import { IUser } from "../util/interface/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;

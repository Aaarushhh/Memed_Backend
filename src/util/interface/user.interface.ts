import { Document } from "mongoose";
import { UserRole } from "../enum/common.enum";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

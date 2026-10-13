import { Request } from "express";
import { UserRole } from "../enum/common.enum";

export interface UserPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface DecodedType extends UserPayload {
  iat: number;
  exp: number;
}

export interface ExtendedRequest extends Request {
  user?: DecodedType;
}

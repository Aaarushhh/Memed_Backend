import jwt from "jsonwebtoken";
import config from "../../config";
import { UserPayload } from "../interface/common.interface";

export const generateJwtToken = (payload: UserPayload): string => {
  return jwt.sign(payload, config.commonConfig.jwtSecretKey!, {
    expiresIn: config.commonConfig.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    algorithm: "HS256",
  });
};

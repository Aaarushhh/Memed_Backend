import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { HttpStatusCode } from "../util/enum/common.enum";
import { DecodedType, ExtendedRequest } from "../util/interface/common.interface";

export const authenticate: RequestHandler = (req: ExtendedRequest, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: "Unauthorized",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: "Invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      config.commonConfig.jwtSecretKey!
    ) as DecodedType;

    req.user = decoded;
    next();
  } catch {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      error: "Unauthorized",
    });
  }
};

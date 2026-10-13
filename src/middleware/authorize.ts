import { RequestHandler } from "express";
import { HttpStatusCode, UserRole } from "../util/enum/common.enum";
import { ExtendedRequest } from "../util/interface/common.interface";

export const authorize = (...roles: UserRole[]): RequestHandler => {
  return (req: ExtendedRequest, res, next) => {
    if (!req.user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        error: "Unauthorized",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(HttpStatusCode.FORBIDDEN).json({
        success: false,
        error: "Forbidden",
      });
    }

    next();
  };
};

import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../util/enum/common.enum";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
}

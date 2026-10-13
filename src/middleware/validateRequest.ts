import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { HttpStatusCode, PayloadType } from "../util/enum/common.enum";

export function validateRequest({
  schema,
  type = PayloadType.BODY,
}: {
  schema: AnySchema;
  type?: PayloadType;
}) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req[type], {
        abortEarly: false,
        stripUnknown: true,
      });
      (req as any)[type] = validated;
      next();
    } catch (err: any) {
      return next({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: err.errors ? err.errors.join(", ") : "Invalid request payload",
      });
    }
  };
}

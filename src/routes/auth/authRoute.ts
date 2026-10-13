import express from "express";
import AuthController from "../../controller/auth/authController";
import { authenticate } from "../../middleware/authenticate";
import { validateRequest } from "../../middleware/validateRequest";
import { loginSchema, signupSchema } from "../../validator/authSchema";

const router = express.Router();

router.post(
  "/signup",
  validateRequest({ schema: signupSchema }),
  AuthController.signup
);
router.post(
  "/login",
  validateRequest({ schema: loginSchema }),
  AuthController.login
);
router.get("/me", authenticate, AuthController.me);

export default router;

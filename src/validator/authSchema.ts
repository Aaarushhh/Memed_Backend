import * as yup from "yup";
import { UserRole } from "../util/enum/common.enum";

export const signupSchema = yup.object({
  name: yup.string().trim().min(2).max(80).required("Name is required"),
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(72)
    .required("Password is required"),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole), "Role must be brand or creator")
    .required("Role is required"),
});

export const loginSchema = yup.object({
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

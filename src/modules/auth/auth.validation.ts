import { z } from "zod";
import { UserRole } from "../user/user.interface.js";

export const registerSchema = z.object({
  username: z.string().min(3),

  email: z.email(),

  password: z.string().min(6),

  role: z.nativeEnum(UserRole).optional(),
});

export const loginSchema = z.object({
  email: z.email(),

  password: z.string().min(6),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),

  newPassword: z.string().min(6),
});
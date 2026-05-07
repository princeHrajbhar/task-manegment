import { Router } from "express";

import {
  login,
  logout,
  register,
} from "./auth.controller.js";

import { validate } from "../../middlewares/validate.middleware.js";

import {
  loginSchema,
  registerSchema,
} from "./auth.validation.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post("/logout", protect, logout);

export default router;
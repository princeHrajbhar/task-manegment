import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

import {
  loginUser,
  registerUser,
} from "./auth.service.js";

import { cookieOptions } from "../../config/cookie.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res
    .status(201)
    .json(new ApiResponse("User registered", user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const data = await loginUser(email, password);

  res
    .cookie("accessToken", data.accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })

    .cookie("refreshToken", data.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    .json(new ApiResponse("Login successful", data.user));
});

export const logout = asyncHandler(async (_req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse("Logout successful"));
});
import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protect = asyncHandler(async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token");
    } else {
      throw new ApiError(401, "Unauthorized");
    }
  }
});
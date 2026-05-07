import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

export const authorize =
  (...roles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user as any;

    if (!roles.includes(user.role)) {
      throw new ApiError(403, "Forbidden");
    }

    next();
  };
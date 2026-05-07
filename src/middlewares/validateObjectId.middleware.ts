import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

export const validateObjectId = (...paramNames: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        for (const paramName of paramNames) {
            const paramValue = req.params[paramName];

            if (paramValue && typeof paramValue === "string" && !mongoose.Types.ObjectId.isValid(paramValue)) {
                throw new ApiError(400, "Invalid ID format");
            }
        }

        next();
    };
};

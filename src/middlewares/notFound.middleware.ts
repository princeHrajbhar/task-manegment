import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new Error(
    `Route Not Found - ${req.originalUrl}`
  );

  next(error);
};
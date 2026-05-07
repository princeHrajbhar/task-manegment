import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../../utils/ApiError.js";

export const verifyProjectOwnership = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const user = req.user as any;

  const project = req.project;

  if (!project) {
    throw new ApiError(
      404,
      "Project not found"
    );
  }

  const isGlobalAdmin =
    user.role === "ADMIN";

  const isOwner =
    project.owner.toString() === user.id;

  if (!isOwner && !isGlobalAdmin) {
    throw new ApiError(
      403,
      "Only project owner can perform this action"
    );
  }

  next();
};
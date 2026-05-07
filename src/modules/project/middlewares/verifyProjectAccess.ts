import { NextFunction, Request, Response } from "express";

import { Project } from "../models/project.model.js";

import { ApiError } from "../../../utils/ApiError.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const verifyProjectAccess = asyncHandler(
  async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const projectId =
      (req.params.projectId || req.body.projectId) as string;

    const user = req.user as any;

    const project = await Project.findById(
      projectId
    );

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    const isGlobalAdmin =
      user.role === "ADMIN";

    const isMember =
      project.members.some(
        (member) =>
          member.user.toString() === user.id
      );

    if (!isMember && !isGlobalAdmin) {
      throw new ApiError(
        403,
        "Access denied"
      );
    }

    req.project = project;

    next();
  }
);
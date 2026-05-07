import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../../utils/ApiError.js";

import { ProjectRole } from "../constants/project.constant.js";

export const verifyProjectAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const user = req.user as any;

  const project = req.project;

  const isGlobalAdmin =
    user.role === "ADMIN";

  const member = project.members.find(
    (member: any) =>
      member.user.toString() === user.id
  );

  const isProjectAdmin =
    member?.role ===
    ProjectRole.PROJECT_ADMIN;

  if (!isProjectAdmin && !isGlobalAdmin) {
    throw new ApiError(
      403,
      "Project admin access required"
    );
  }

  next();
};
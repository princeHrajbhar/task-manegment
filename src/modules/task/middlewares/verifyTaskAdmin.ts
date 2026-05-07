import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../utils/ApiError.js";
import { UserRole } from "../../user/user.interface.js";
import { ProjectRole } from "../../project/constants/project.constant.js";

export const verifyTaskAdmin = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const user = req.user as any;
    const project = req.project as any;

    const isGlobalAdmin = user.role === UserRole.ADMIN;

    if (isGlobalAdmin) {
        return next();
    }

    const isProjectAdmin = project.members.some(
        (member: any) =>
            member.user.toString() === user.id &&
            member.role === ProjectRole.PROJECT_ADMIN
    );

    if (!isProjectAdmin) {
        throw new ApiError(403, "Project admin access required");
    }

    next();
};

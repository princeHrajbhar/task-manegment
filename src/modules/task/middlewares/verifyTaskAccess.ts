import { NextFunction, Request, Response } from "express";
import { Task } from "../models/task.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { UserRole } from "../../user/user.interface.js";

export const verifyTaskAccess = asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
        const taskId = req.params.taskId as string;
        const user = req.user as any;

        const task = await Task.findById(taskId).populate("project");

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        const project = task.project as any;

        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        const isGlobalAdmin = user.role === UserRole.ADMIN;

        const isMember = project.members.some(
            (member: any) => member.user.toString() === user.id
        );

        if (!isMember && !isGlobalAdmin) {
            throw new ApiError(403, "Access denied");
        }

        req.task = task;
        req.project = project;

        next();
    }
);

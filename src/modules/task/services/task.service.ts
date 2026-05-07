import { Task } from "../models/task.model.js";

import { ApiError } from "../../../utils/ApiError.js";

import { Project } from "../../project/models/project.model.js";

import { ProjectRole } from "../../project/constants/project.constant.js";

import { User } from "../../user/user.model.js";

import { UserRole } from "../../user/user.interface.js";

export const createTaskService =
  async (
    payload: any,
    userId: string,
    userRole: string
  ) => {
    const project =
      await Project.findById(
        payload.projectId
      );

    if (!project) {
      throw new ApiError(
        404,
        "Project not found"
      );
    }

    const isGlobalAdmin = userRole === UserRole.ADMIN;

    const adminMember =
      project.members.find(
        (member) =>
          member.user.toString() ===
          userId &&
          member.role ===
          ProjectRole.PROJECT_ADMIN
      );

    if (
      !adminMember &&
      !isGlobalAdmin
    ) {
      throw new ApiError(
        403,
        "Only project admin can assign tasks"
      );
    }

    // Validate assignedTo user exists
    if (payload.assignedTo) {
      const assignedUser = await User.findById(payload.assignedTo);

      if (!assignedUser) {
        throw new ApiError(
          404,
          "Assigned user not found"
        );
      }

      // Validate assignedTo user is project member
      const isAssignedUserMember = project.members.some(
        (member) => member.user.toString() === payload.assignedTo
      );

      if (!isAssignedUserMember) {
        throw new ApiError(
          400,
          "User is not a member of this project"
        );
      }
    }

    const task = await Task.create({
      title: payload.title,

      description:
        payload.description,

      dueDate: payload.dueDate,

      priority: payload.priority,

      project: payload.projectId,

      assignedTo:
        payload.assignedTo,

      assignedBy: userId,

      tags: payload.tags || [],

      attachments:
        payload.attachments || [],
    });

    return task;
  };

export const getProjectTasksService =
  async (
    projectId: string,
    userId: string,
    userRole: string
  ) => {
    const isGlobalAdmin = userRole === UserRole.ADMIN;

    if (!isGlobalAdmin) {
      const project = await Project.findById(projectId);

      if (!project) {
        throw new ApiError(
          404,
          "Project not found"
        );
      }

      const isMember = project.members.some(
        (member) => member.user.toString() === userId
      );

      if (!isMember) {
        throw new ApiError(
          403,
          "Access denied"
        );
      }
    }

    const tasks = await Task.find({
      project: projectId,

      isDeleted: false,
    })

      .populate(
        "assignedTo",
        "username email"
      )

      .populate(
        "assignedBy",
        "username email"
      )

      .sort({
        createdAt: -1,
      });

    return tasks;
  };

export const getSingleTaskService =
  async (
    taskId: string,
    userId: string,
    userRole: string
  ) => {
    const task =
      await Task.findById(taskId)

        .populate(
          "assignedTo",
          "username email"
        )

        .populate(
          "assignedBy",
          "username email"
        )

        .populate("project");

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    const isGlobalAdmin = userRole === UserRole.ADMIN;

    if (!isGlobalAdmin) {
      const project = task.project as any;

      const isMember = project.members.some(
        (member: any) => member.user.toString() === userId
      );

      if (!isMember) {
        throw new ApiError(
          403,
          "Access denied"
        );
      }
    }

    return task;
  };

export const updateTaskService =
  async (
    taskId: string,
    payload: any,
    userId: string,
    userRole: string,
    project: any
  ) => {
    const isGlobalAdmin = userRole === UserRole.ADMIN;

    const isProjectAdmin = project.members.some(
      (member: any) =>
        member.user.toString() === userId &&
        member.role === ProjectRole.PROJECT_ADMIN
    );

    if (!isGlobalAdmin && !isProjectAdmin) {
      throw new ApiError(
        403,
        "Project admin access required"
      );
    }

    // If assignedTo is being changed, validate the new user
    if (payload.assignedTo) {
      const assignedUser = await User.findById(payload.assignedTo);

      if (!assignedUser) {
        throw new ApiError(
          404,
          "Assigned user not found"
        );
      }

      // Validate assignedTo user is project member
      const isAssignedUserMember = project.members.some(
        (member: any) => member.user.toString() === payload.assignedTo
      );

      if (!isAssignedUserMember) {
        throw new ApiError(
          400,
          "User is not a member of this project"
        );
      }
    }

    const task =
      await Task.findByIdAndUpdate(
        taskId,
        payload,
        {
          new: true,
        }
      );

    return task;
  };

export const deleteTaskService =
  async (
    taskId: string,
    userId: string,
    userRole: string,
    project: any
  ) => {
    const isGlobalAdmin = userRole === UserRole.ADMIN;

    const isProjectAdmin = project.members.some(
      (member: any) =>
        member.user.toString() === userId &&
        member.role === ProjectRole.PROJECT_ADMIN
    );

    if (!isGlobalAdmin && !isProjectAdmin) {
      throw new ApiError(
        403,
        "Project admin access required"
      );
    }

    const task =
      await Task.findById(taskId);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    task.isDeleted = true;

    await task.save();

    return null;
  };

export const updateTaskStatusService =
  async (
    taskId: string,
    status: string,
    userId: string,
    userRole: string
  ) => {
    const task =
      await Task.findById(taskId);

    if (!task) {
      throw new ApiError(
        404,
        "Task not found"
      );
    }

    const isGlobalAdmin = userRole === UserRole.ADMIN;

    if (
      !isGlobalAdmin &&
      task.assignedTo.toString() !== userId
    ) {
      throw new ApiError(
        403,
        "Only assigned member can update task status"
      );
    }

    task.status = status as any;

    await task.save();

    return task;
  };
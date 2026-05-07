import { asyncHandler } from "../../../utils/asyncHandler.js";

import { ApiResponse } from "../../../utils/ApiResponse.js";

import {
  createTaskService,
  deleteTaskService,
  getProjectTasksService,
  getSingleTaskService,
  updateTaskService,
  updateTaskStatusService,
} from "../services/task.service.js";

export const createTask =
  asyncHandler(async (req, res) => {
    const user = req.user as any;

    const task =
      await createTaskService(
        req.body,
        user.id,
        user.role
      );

    res
      .status(201)
      .json(
        new ApiResponse(
          "Task created successfully",
          task
        )
      );
  });

export const getProjectTasks =
  asyncHandler(async (req, res) => {
    const user = req.user as any;

    const tasks =
      await getProjectTasksService(
        req.params.projectId as string,
        user.id,
        user.role
      );

    res.json(
      new ApiResponse(
        "Tasks fetched successfully",
        tasks
      )
    );
  });

export const getSingleTask =
  asyncHandler(async (req, res) => {
    const user = req.user as any;

    const task =
      await getSingleTaskService(
        req.params.taskId as string,
        user.id,
        user.role
      );

    res.json(
      new ApiResponse(
        "Task fetched successfully",
        task
      )
    );
  });

export const updateTask =
  asyncHandler(async (req, res) => {
    const user = req.user as any;
    const project = req.project as any;

    const task =
      await updateTaskService(
        req.params.taskId as string,
        req.body,
        user.id,
        user.role,
        project
      );

    res.json(
      new ApiResponse(
        "Task updated successfully",
        task
      )
    );
  });

export const deleteTask =
  asyncHandler(async (req, res) => {
    const user = req.user as any;
    const project = req.project as any;

    await deleteTaskService(
      req.params.taskId as string,
      user.id,
      user.role,
      project
    );

    res.json(
      new ApiResponse(
        "Task deleted successfully"
      )
    );
  });

export const updateTaskStatus =
  asyncHandler(async (req, res) => {
    const user = req.user as any;

    const task =
      await updateTaskStatusService(
        req.params.taskId as string,

        req.body.status,

        user.id,

        user.role
      );

    res.json(
      new ApiResponse(
        "Task status updated successfully",
        task
      )
    );
  });
import { Router } from "express";

import { protect } from "../../../middlewares/auth.middleware.js";

import { validate } from "../../../middlewares/validate.middleware.js";

import {
  createTask,
  deleteTask,
  getProjectTasks,
  getSingleTask,
  updateTask,
  updateTaskStatus,
} from "../controllers/task.controller.js";

import {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} from "../validators/task.validation.js";

import { verifyTaskAccess } from "../middlewares/verifyTaskAccess.js";
import { verifyTaskAdmin } from "../middlewares/verifyTaskAdmin.js";
import { verifyProjectAccess } from "../../project/middlewares/verifyProjectAccess.js";
import { validateObjectId } from "../../../middlewares/validateObjectId.middleware.js";

const router = Router();

router.post(
  "/",
  protect,
  validate(createTaskSchema),
  verifyProjectAccess,
  verifyTaskAdmin,
  createTask
);

router.get(
  "/project/:projectId",
  validateObjectId("projectId"),
  protect,
  verifyProjectAccess,
  getProjectTasks
);

router.get(
  "/:taskId",
  validateObjectId("taskId"),
  protect,
  verifyTaskAccess,
  getSingleTask
);

router.patch(
  "/:taskId",
  validateObjectId("taskId"),
  protect,
  verifyTaskAccess,
  verifyTaskAdmin,
  validate(updateTaskSchema),
  updateTask
);

router.delete(
  "/:taskId",
  validateObjectId("taskId"),
  protect,
  verifyTaskAccess,
  verifyTaskAdmin,
  deleteTask
);

router.patch(
  "/:taskId/status",
  validateObjectId("taskId"),
  protect,
  verifyTaskAccess,
  validate(updateTaskStatusSchema),
  updateTaskStatus
);

export default router;
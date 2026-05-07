import { z } from "zod";

import {
  TaskPriority,
  TaskStatus,
} from "../constants/task.constant.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const createTaskSchema = z.object({
  title: z.string().min(3),

  description: z.string().optional(),

  dueDate: z.string().optional(),

  priority: z.nativeEnum(TaskPriority),

  projectId: objectIdSchema,

  assignedTo: objectIdSchema,

  tags: z.array(z.string()).optional(),

  attachments: z
    .array(z.string())
    .optional(),
});

export const updateTaskSchema =
  createTaskSchema.partial();

export const updateTaskStatusSchema =
  z.object({
    status: z.nativeEnum(TaskStatus),
  });
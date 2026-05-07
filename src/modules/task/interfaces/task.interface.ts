import { Types } from "mongoose";

import {
  TaskPriority,
  TaskStatus,
} from "../constants/task.constant.js";

export interface ITask {
  title: string;

  description?: string;

  dueDate?: Date;

  priority: TaskPriority;

  status: TaskStatus;

  project: Types.ObjectId;

  assignedTo: Types.ObjectId;

  assignedBy: Types.ObjectId;

  tags: string[];

  attachments: string[];

  isDeleted: boolean;
}
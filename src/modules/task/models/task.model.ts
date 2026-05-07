import mongoose, { Schema } from "mongoose";

import {
  TaskPriority,
  TaskStatus,
} from "../constants/task.constant.js";

import { ITask } from "../interfaces/task.interface.js";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    dueDate: {
      type: Date,
    },

    priority: {
      type: String,

      enum: Object.values(TaskPriority),

      default: TaskPriority.MEDIUM,
    },

    status: {
      type: String,

      enum: Object.values(TaskStatus),

      default: TaskStatus.TODO,
    },

    project: {
      type: Schema.Types.ObjectId,

      ref: "Project",

      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    assignedBy: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    attachments: [
      {
        type: String,
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITask>(
  "Task",
  taskSchema
);
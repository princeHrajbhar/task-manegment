import mongoose, { Schema } from "mongoose";

import {
  ProjectRole,
  ProjectStatus,
} from "../constants/project.constant.js";

import {
  IProject,
  IProjectMember,
} from "../interfaces/project.interface.js";

const projectMemberSchema =
  new Schema<IProjectMember>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      role: {
        type: String,
        enum: Object.values(ProjectRole),

        default: ProjectRole.PROJECT_MEMBER,
      },

      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

const projectSchema = new Schema<IProject>(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
    },

    projectImage: {
      type: String,
    },

    techStack: [
      {
        type: String,
      },
    ],

    githubUrl: {
      type: String,
    },

    liveUrl: {
      type: String,
    },

    status: {
      type: String,

      enum: Object.values(ProjectStatus),

      default: ProjectStatus.ACTIVE,
    },

    owner: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    members: [projectMemberSchema],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({
  projectName: "text",
  description: "text",
});

export const Project = mongoose.model<IProject>(
  "Project",
  projectSchema
);
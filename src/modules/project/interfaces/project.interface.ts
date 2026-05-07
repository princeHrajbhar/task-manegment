import { Types } from "mongoose";

import {
  ProjectRole,
  ProjectStatus,
} from "../constants/project.constant.js";

export interface IProjectMember {
  user: Types.ObjectId;

  role: ProjectRole;

  joinedAt: Date;
}

export interface IProject {
  projectName: string;

  slug: string;

  description?: string;

  projectImage?: string;

  techStack: string[];

  githubUrl?: string;

  liveUrl?: string;

  status: ProjectStatus;

  owner: Types.ObjectId;

  members: IProjectMember[];

  isDeleted: boolean;
}
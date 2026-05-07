import { z } from "zod";

import {
  ProjectRole,
  ProjectStatus,
} from "../constants/project.constant.js";

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const createProjectSchema = z.object({
  projectName: z.string().min(3),

  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),

  description: z.string().optional(),

  projectImage: z.string().optional(),

  techStack: z.array(z.string()),

  githubUrl: z.string().optional(),

  liveUrl: z.string().optional(),

  status: z.nativeEnum(ProjectStatus).optional(),
});

export const updateProjectSchema =
  createProjectSchema.partial();

export const addProjectMemberSchema =
  z.object({
    userId: objectIdSchema,

    role: z
      .nativeEnum(ProjectRole)
      .optional(),
  });

export const updateProjectMemberRoleSchema =
  z.object({
    role: z.nativeEnum(ProjectRole),
  });
import { Router } from "express";

import { protect } from "../../../middlewares/auth.middleware.js";

import { validate } from "../../../middlewares/validate.middleware.js";

import {
  addProjectMember,
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../controllers/project.controller.js";

import {
  addProjectMemberSchema,
  createProjectSchema,
  updateProjectSchema,
} from "../validations/project.validation.js";

import { verifyProjectAccess } from "../middlewares/verifyProjectAccess.js";

import { verifyProjectAdmin } from "../middlewares/verifyProjectAdmin.js";
import {
  getProjectMembers,
  removeProjectMember,
  updateProjectMemberRole,
} from "../controllers/project.controller.js";

import {
  updateProjectMemberRoleSchema,
} from "../validations/project.validation.js";

import { validateObjectId } from "../../../middlewares/validateObjectId.middleware.js";

const router = Router();

router.post(
  "/",
  protect,
  validate(createProjectSchema),
  createProject
);

router.get(
  "/",
  protect,
  getAllProjects
);

router.get(
  "/:projectId",
  validateObjectId("projectId"),
  protect,
  verifyProjectAccess,
  getSingleProject
);

router.patch(
  "/:projectId",
  validateObjectId("projectId"),
  protect,
  verifyProjectAccess,
  verifyProjectAdmin,
  validate(updateProjectSchema),
  updateProject
);

router.delete(
  "/:projectId",
  validateObjectId("projectId"),
  protect,
  verifyProjectAccess,
  verifyProjectAdmin,
  deleteProject
);

router.post(
  "/:projectId/members",
  validateObjectId("projectId"),
  protect,
  verifyProjectAccess,
  verifyProjectAdmin,
  validate(addProjectMemberSchema),
  addProjectMember
);

router.get(
  "/:projectId/members",
  validateObjectId("projectId"),
  protect,
  verifyProjectAccess,
  getProjectMembers
);

router.patch(
  "/:projectId/members/:memberId/role",
  validateObjectId("projectId", "memberId"),
  protect,
  verifyProjectAccess,
  verifyProjectAdmin,
  validate(updateProjectMemberRoleSchema),
  updateProjectMemberRole
);

router.delete(
  "/:projectId/members/:memberId",
  validateObjectId("projectId", "memberId"),
  protect,
  verifyProjectAccess,
  verifyProjectAdmin,
  removeProjectMember
);

export default router;
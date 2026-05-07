import { Router } from "express";

import {
  changeUserRole,
  deleteUser,
  getAllUsers,
  getCurrentUser,
} from "./user.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

import { authorize } from "../../middlewares/role.middleware.js";

import { UserRole } from "./user.interface.js";

import { validateObjectId } from "../../middlewares/validateObjectId.middleware.js";

const router = Router();

router.get(
  "/me",
  protect,
  getCurrentUser
);

router.get(
  "/",
  protect,
  authorize(UserRole.ADMIN),
  getAllUsers
);

router.delete(
  "/:userId",
  validateObjectId("userId"),
  protect,
  authorize(UserRole.ADMIN),
  deleteUser
);

router.patch(
  "/:userId/role",
  validateObjectId("userId"),
  protect,
  authorize(UserRole.ADMIN),
  changeUserRole
);

export default router;
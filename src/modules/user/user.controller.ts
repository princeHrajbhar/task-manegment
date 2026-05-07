import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

import {
  changeUserRoleService,
  deleteUserService,
  getAllUsersService,
  getCurrentUserService,
} from "./user.service.js";

export const getAllUsers = asyncHandler(
  async (_req: Request, res: Response) => {
    const users = await getAllUsersService();

    res.json(
      new ApiResponse("Users fetched successfully", users)
    );
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    await deleteUserService(userId);

    res.json(
      new ApiResponse("User deleted successfully")
    );
  }
);

export const changeUserRole = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    const { role } = req.body;

    const user = await changeUserRoleService(
      userId,
      role
    );

    res.json(
      new ApiResponse(
        "User role updated successfully",
        user
      )
    );
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as any;

    const currentUser = await getCurrentUserService(
      user.id
    );

    res.json(
      new ApiResponse(
        "Current user fetched successfully",
        currentUser
      )
    );
  }
);
import { User } from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { UserRole } from "./user.interface.js";

export const getAllUsersService = async () => {
  const users = await User.find().select("-password");

  return users;
};

export const deleteUserService = async (
  userId: string
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await User.findByIdAndDelete(userId);

  return null;
};

export const changeUserRoleService = async (
  userId: string,
  role: UserRole
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.role = role;

  await user.save();

  return user;
};

export const getCurrentUserService = async (
  userId: string
) => {
  const user = await User.findById(userId).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};
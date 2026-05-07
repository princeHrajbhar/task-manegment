import { User } from "../user/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import {
  comparePassword,
  hashPassword,
} from "../../utils/bcrypt.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.js";

export const registerUser = async (payload: any) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  payload.password = await hashPassword(payload.password);

  const user = await User.create(payload);

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user._id,
  });

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/user/user.route.js";

import { env } from "./config/env.js";

import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import projectRoutes from "./modules/project/routes/project.route.js";
import taskRoutes from "./modules/task/routes/ask.route.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Core Middlewares
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully 🚀",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);

/*
|--------------------------------------------------------------------------
| Not Found Middleware
|--------------------------------------------------------------------------
*/

app.use(notFoundHandler);

/*
|--------------------------------------------------------------------------
| Global Error Middleware
|--------------------------------------------------------------------------
*/

app.use(globalErrorHandler);









export default app;
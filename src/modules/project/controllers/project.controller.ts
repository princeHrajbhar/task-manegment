import { Request, Response } from "express";

import { asyncHandler } from "../../../utils/asyncHandler.js";

import { ApiResponse } from "../../../utils/ApiResponse.js";

import {
  addProjectMemberService,
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getSingleProjectService,
  updateProjectService,
} from "../services/project.service.js";

import {
  getProjectMembersService,
  removeProjectMemberService,
  updateProjectMemberRoleService,
} from "../services/project.service.js";

export const createProject =
  asyncHandler(async (req, res) => {
    const user = req.user as any;

    const project =
      await createProjectService(
        req.body,
        user.id
      );

    res
      .status(201)
      .json(
        new ApiResponse(
          "Project created successfully",
          project
        )
      );
  });

export const getAllProjects =
  asyncHandler(async (req, res) => {
    const projects =
      await getAllProjectsService(
        req.query
      );

    res.json(
      new ApiResponse(
        "Projects fetched successfully",
        projects
      )
    );
  });

export const getSingleProject =
  asyncHandler(async (req, res) => {
    const project =
      await getSingleProjectService(
        req.params.projectId as string
      );

    res.json(
      new ApiResponse(
        "Project fetched successfully",
        project
      )
    );
  });

export const updateProject =
  asyncHandler(async (req, res) => {
    const project =
      await updateProjectService(
        req.params.projectId as string,
        req.body
      );

    res.json(
      new ApiResponse(
        "Project updated successfully",
        project
      )
    );
  });

export const deleteProject =
  asyncHandler(async (req, res) => {
    await deleteProjectService(
      req.params.projectId as string
    );

    res.json(
      new ApiResponse(
        "Project deleted successfully"
      )
    );
  });

export const addProjectMember =
  asyncHandler(async (req, res) => {
    const project =
      await addProjectMemberService(
        req.params.projectId as string,
        req.body
      );

    res.json(
      new ApiResponse(
        "Project member added successfully",
        project
      )
    );
  });

  export const getProjectMembers =
  asyncHandler(async (req, res) => {
    const members =
      await getProjectMembersService(
        req.params.projectId as string
      );

    res.json(
      new ApiResponse(
        "Project members fetched successfully",
        members
      )
    );
  });

  export const updateProjectMemberRole =
  asyncHandler(async (req, res) => {
    const project =
      await updateProjectMemberRoleService(
        req.params.projectId as string,

        req.params.memberId as string,

        req.body.role
      );

    res.json(
      new ApiResponse(
        "Project member role updated successfully",
        project
      )
    );
  });

  export const removeProjectMember =
  asyncHandler(async (req, res) => {
    const project =
      await removeProjectMemberService(
        req.params.projectId as string,

        req.params.memberId as string
      );

    res.json(
      new ApiResponse(
        "Project member removed successfully",
        project
      )
    );
  });
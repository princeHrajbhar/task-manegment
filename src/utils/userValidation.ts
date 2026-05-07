import { User, IUser } from "../modules/user/user.model.js";
import { Project } from "../modules/project/models/project.model.js";
import { ApiError } from "./ApiError.js";

export const validateUserExists = async (userId: string): Promise<IUser> => {
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

export const validateUserIsProjectMember = async (
    userId: string,
    projectId: string
): Promise<boolean> => {
    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(404, "Project not found");
    }

    const isMember = project.members.some(
        (member) => member.user.toString() === userId
    );

    return isMember;
};

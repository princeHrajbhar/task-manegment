import { JwtPayload } from "jsonwebtoken";

import { IProject } from "../modules/project/interfaces/project.interface.js";
import { ITask } from "../modules/task/interfaces/task.interface.js";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | any;

      project?: IProject | any;

      task?: ITask | any;
    }
  }
}
import { Router } from "express";
import { container } from "tsyringe";
import { TaskServices } from "../services/task.services";
import { TaskControllers } from "../controllers/task.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { ValidateToken } from "../middlewares/validateToken.middeware";
import { IsUserOwner } from "../middlewares/isUserOwner.middleware";

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);
export const taskRouter = Router();


taskRouter.use(ValidateToken.execute)
taskRouter.post("/", ValidateBody.execute(taskCreateSchema), IsCategoryIdValid.body, IsUserOwner.category, (req, res) => taskControllers.create(req, res));
taskRouter.get("/", (req, res) => taskControllers.getTasks(req, res));
taskRouter.get("/:id", IsTaskIdValid.execute, IsUserOwner.task, (req, res) => taskControllers.getOneTask(req, res));
taskRouter.patch("/:id", ValidateBody.execute(taskUpdateSchema), IsTaskIdValid.execute, IsCategoryIdValid.body, IsUserOwner.task, (req, res) => taskControllers.patchTask(req, res));
taskRouter.delete("/:id", IsTaskIdValid.execute, IsUserOwner.task, (req, res) => taskControllers.deleteTask(req, res));
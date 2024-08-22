import { Router } from "express";
import { container } from "tsyringe";
import { TaskServices } from "../services/task.services";
import { TaskControllers } from "../controllers/task.controllers";
import { ValidadeBody } from "../middlewares/validadeBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";

export const taskRouter = Router();
container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);


taskRouter.post("/", ValidadeBody.execute(taskCreateSchema), IsCategoryIdValid.execute, (req, res) => taskControllers.create(req, res));
taskRouter.get("/", (req, res) => taskControllers.getTasks(req, res));
taskRouter.get("/:id", IsTaskIdValid.execute, (req, res) => taskControllers.getOneTask(req, res));
taskRouter.patch("/:id", ValidadeBody.execute(taskUpdateSchema),IsTaskIdValid.execute, (req, res) => taskControllers.patchTask(req, res));
taskRouter.delete("/:id", IsTaskIdValid.execute, (req, res) => taskControllers.deleteTask(req, res)); 

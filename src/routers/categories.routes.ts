import { Router } from "express";
import { container } from "tsyringe";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { CategoriesServices } from "../services/categories.services";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { ValidadeBody } from "../middlewares/validadeBody.middleware";
import { categoryCreateSchema } from "../schemas/categories.schemas";

export const categoriesRouter = Router();
container.registerSingleton("CategoriesServices", CategoriesServices);
const categoriesControllers = container.resolve(CategoriesControllers);

categoriesRouter.post("/", ValidadeBody.execute(categoryCreateSchema), (req,res) => categoriesControllers.create(req,res));
categoriesRouter.delete("/:id", IsCategoryIdValid.execute, (req,res) => categoriesControllers.delete(req,res));

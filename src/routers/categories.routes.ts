import { Router } from "express";
import { container } from "tsyringe";
import { CategoriesControllers } from "../controllers/categories.controllers";
import { CategoriesServices } from "../services/categories.services";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/categories.schemas";
import { ValidateToken } from "../middlewares/validateToken.middeware";
import { IsUserOwner } from "../middlewares/isUserOwner.middleware";

container.registerSingleton("CategoriesServices", CategoriesServices);
const categoriesControllers = container.resolve(CategoriesControllers);
export const categoriesRouter = Router();

categoriesRouter.use(ValidateToken.execute)
categoriesRouter.post("/", ValidateBody.execute(categoryCreateSchema), (req, res) => categoriesControllers.create(req, res));
categoriesRouter.delete("/:id", IsCategoryIdValid.params, IsUserOwner.category, (req, res) => categoriesControllers.delete(req, res));

import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/users.services";
import { UserControllers } from "../controllers/user.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { UserLoginBodySchema, UserRegisterBodySchema } from "../schemas/user.schema";
import { IsUserEmailValid } from "../middlewares/isUserEmailValid.middleware";
import { ValidateToken } from "../middlewares/validateToken.middeware";


export const userRouter = Router();
container.registerSingleton("UserServices", UserServices);
const userControllers = container.resolve(UserControllers);


userRouter.post("/", ValidateBody.execute(UserRegisterBodySchema), IsUserEmailValid.execute, (req,res) => userControllers.register(req,res));
userRouter.post("/login", ValidateBody.execute(UserLoginBodySchema), (req,res) => userControllers.login(req,res));
userRouter.get("/profile", ValidateToken.execute, (req,res) => userControllers.getUser(req,res));
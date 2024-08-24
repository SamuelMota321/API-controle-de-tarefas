import "reflect-metadata";
import "dotenv/config"
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { taskRouter } from "./routers/task.routes";
import { HandleErrors } from "./middlewares/handleError.middleware";
import { categoriesRouter } from "./routers/categories.routes";
import { userRouter } from "./routers/user.routes";

export const app = express();

app.use(helmet());
app.use(json());
app.use("/tasks", taskRouter);
app.use("/categories", categoriesRouter);
app.use("/users", userRouter);
app.use(HandleErrors.execute);

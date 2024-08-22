import "reflect-metadata";
import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { taskRouter } from "./routers/task.routes";
import { HandleErrors } from "./middlewares/handleError.middleware";
import { categoriesRouter } from "./routers/categories.routes";

export const app = express();

app.use(helmet());
app.use(json());
app.use("/tasks", taskRouter);
app.use("/categories", categoriesRouter);
app.use(HandleErrors.execute);

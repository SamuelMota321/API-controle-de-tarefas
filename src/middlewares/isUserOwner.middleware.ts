import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsUserOwner {
    static async task(req: Request, res: Response, next: NextFunction) {
        const userId = res.locals.decode.id;
        const taskId = req.params.id;
        const task = await prisma.task.findFirst({ where: { id: Number(taskId) } })

        if (task?.userId !== userId) {
            throw new AppError(403, "User is not the owner of this Task")
        }
        next();
    }
    
    static async category(req: Request, res: Response, next: NextFunction) {
        const userId = res.locals.decode.id;
        const categoryId = req.params.id || req.body.categoryId;
        const category = await prisma.category.findFirst({ where: { id: Number(categoryId) } })

        if (category?.userId !== userId) {
            throw new AppError(403, "User is not the owner of this Category")
        }
        next();

    }
}
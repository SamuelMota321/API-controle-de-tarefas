import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryIdValid {
    static async body(req: Request, res: Response, next: NextFunction) {
        if (req.body.categoryId) {
            const categoryId = req.body.categoryId;
            const category = await prisma.category.findFirst({ where: { id: Number(categoryId) } })
            if (!category) {
                throw new AppError(404, "Category not found");
            }
        }
        next();
    }
    static async params(req: Request, res: Response, next: NextFunction) {
        const categoryId = req.params.id;
        const category = await prisma.category.findFirst({ where: { id: Number(categoryId) } })
        if (!category) {
            throw new AppError(404, "Category not found");
        }
        next();
    }
}
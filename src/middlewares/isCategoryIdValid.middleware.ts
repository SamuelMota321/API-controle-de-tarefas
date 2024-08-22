import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryIdValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        if (req.body.categoryId || req.params.id) {
            const categoryId = req.body.categoryId || req.params.id;
            const category = await prisma.category.findFirst({ where: { id: Number(categoryId) } })
            if (!category) {
                throw new AppError(404, "Category not found");
            }
        }
        next();
    }
}
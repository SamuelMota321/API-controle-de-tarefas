import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsUserEmailValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email
        const userEmail = await prisma.user.findFirst({ where: { email: email } })
        if (userEmail) {
            throw new AppError(409, "This email is already registered");
        }
        next();
    }
} 
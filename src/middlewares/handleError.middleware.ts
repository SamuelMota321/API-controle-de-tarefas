import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrors {
    static execute(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        if(error instanceof JsonWebTokenError) {
            return res.status(403).json({message: error.message})
        }

        if (error instanceof ZodError) {
            function transformZodError(error: ZodError) {
                return {
                    errors: error.issues
                }
            }
            return res.status(400).json(transformZodError(error));
        }

        return res.status(500).json({ message: "Internar server error" });
    }
}
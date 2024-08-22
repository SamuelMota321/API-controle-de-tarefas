import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export class ValidadeBody {
    static execute(schema: ZodSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            req.body = await schema.parseAsync(req.body);
            next();
        }
    }
}
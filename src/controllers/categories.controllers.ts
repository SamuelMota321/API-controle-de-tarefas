import { inject, injectable } from "tsyringe";
import { CategoriesServices } from "../services/categories.services";
import { Request, Response } from "express";

@injectable()
export class CategoriesControllers {
    constructor(@inject("CategoriesServices") private categoriesServices: CategoriesServices) { }

    async create(req: Request, res: Response) {
        const response = await this.categoriesServices.create(req.body)
        return res.status(201).json(response)
    }
    async delete(req: Request, res: Response) {
        const response = await this.categoriesServices.delete(Number(req.params.id))
        return res.status(204).json()
    }

}
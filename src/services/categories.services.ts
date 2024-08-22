import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCreateCategory } from "../schemas/categories.schemas";

@injectable()
export class CategoriesServices {
    async create(body: TCreateCategory) {
        const response = await prisma.category.create({ data: body })
        return response;
    }
    async delete(id: number ) {
        await prisma.category.delete({ where: { id } })
    }

}
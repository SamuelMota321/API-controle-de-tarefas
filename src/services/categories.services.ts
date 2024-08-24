import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCategory, TCreateCategory } from "../schemas/categories.schemas";

@injectable()
export class CategoriesServices {
    async create(userId: number, body: TCreateCategory): Promise<TCategory> {
        const newCategory = { ...body, userId }
        const response = await prisma.category.create({ data: newCategory })
        return response;
    }
    async delete(id: number) {
        await prisma.category.delete({ where: { id } })
    }

}
import { injectable } from "tsyringe";
import { TCreateTask, TGetTask, TTask, TUpdateTask } from "../schemas/task.schema";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

@injectable()
export class TaskServices {
    async create(userId: number, body: TCreateTask): Promise<TTask> {
        const newTask = { ...body, userId }
        const response = await prisma.task.create({ data: newTask });
        return response;
    }

    async getTasks(id: number, categoryName: string): Promise<TGetTask[]> {

        if (categoryName) {
            const categoryAlredyExist = await prisma.category.findMany({
                where: {
                    name: categoryName,
                    userId: id
                }
            })
            if (categoryAlredyExist.length == 0) {
                throw new AppError(404, "category not found")
            }
        }

        const response = await prisma.task.findMany({
            where: {
                category: { name: categoryName },
                userId: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                finished: true,
                userId: true,
                category: true,
                categoryId: false
            }
        });
        return response;
    }

    async getOneTask(userId: number, id: number): Promise<TGetTask> {
        const response = await prisma.task.findFirst({
            where: { id, userId },
            select: {
                id: true,
                title: true,
                content: true,
                finished: true,
                userId: true,
                category: true,
                categoryId: false
            }
        });
        return response as TGetTask;
    }

    async patchTask(id: number, body: TUpdateTask): Promise<TTask> {
        const response = await prisma.task.update({ where: { id }, data: body })
        return response;
    }

    async deleteTask(id: number): Promise<void> {
        await prisma.task.delete({ where: { id } })
    }
}

import { injectable } from "tsyringe";
import { TCreateTask, TGetTask, TTask, TUpdateTask } from "../schemas/task.schema";
import { prisma } from "../database/prisma";

@injectable()
export class TaskServices {
    async create(body: TCreateTask): Promise<TTask> {
        const response = await prisma.task.create({ data: body });
        return response;
    }

    async getTasks(categoryName: string): Promise<TGetTask[]> {

        const response = await prisma.task.findMany({
            where: {
                category: { name: categoryName }
            },
            select: {
                id: true,
                title: true,
                content: true,
                finished: true,
                category: true,
                categoryId: false
            }
        });
        return response;
    }

    async getOneTask(id: number): Promise<TGetTask> {
        const response = await prisma.task.findFirst({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                finished: true,
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

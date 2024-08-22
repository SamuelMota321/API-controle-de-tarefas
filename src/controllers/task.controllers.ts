import { inject, injectable } from "tsyringe";
import { TaskServices } from "../services/task.services";
import { Request, Response } from "express";
import { taskSchema } from "../schemas/task.schema";

@injectable()
export class TaskControllers {
    constructor(@inject("TaskServices") private taskServices: TaskServices) { }

    async create(req: Request, res: Response) {
        const response = await this.taskServices.create(req.body)
        return res.status(201).json(response);
    }

    async getTasks(req: Request, res: Response) {
        const category =  req.query.category;
        const response = await this.taskServices.getTasks(category as string);
        return res.status(200).json(response);
    }

    async getOneTask(req: Request, res: Response) {
        const category =  req.query.category;
        const response = await this.taskServices.getOneTask( Number(req.params.id));
        return res.status(200).json(response)
    }

    async patchTask(req: Request, res: Response) {
        const response = await this.taskServices.patchTask(Number(req.params.id), req.body)
        return res.status(200).json(response)
    }

    async deleteTask(req: Request, res: Response) {
        await this.taskServices.deleteTask(Number(req.params.id))
        return res.status(204).json()
    }

}
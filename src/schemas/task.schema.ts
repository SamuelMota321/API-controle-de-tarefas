import { z } from "zod";
import { categorySchema } from "./categories.schemas";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    categoryId: z.number().positive().nullable(),
    userId: z.number().positive(),
    category: categorySchema.nullable(),
});

export const getTaskSchema = taskSchema.omit({ categoryId: true });
export const taskBaseSchema = taskSchema.omit({ id: true, category: true, userId: true });
export const taskCreateSchema = taskBaseSchema.partial({ categoryId: true }).omit({ finished: true });
export const taskUpdateSchema = taskBaseSchema.partial();

export type TTask = z.infer<typeof taskBaseSchema>;
export type TCreateTask = z.infer<typeof taskCreateSchema>;
export type TGetTask = z.infer<typeof getTaskSchema>;
export type TUpdateTask = z.infer<typeof taskUpdateSchema>;

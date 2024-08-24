import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    userId: z.number().positive()
});

export const categoryCreateSchema = categorySchema.omit({id: true, userId: true});
export type TCategory = z.infer<typeof categorySchema>;
export type TCreateCategory = z.infer<typeof categoryCreateSchema>;
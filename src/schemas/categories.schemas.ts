import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string()
});

export const categoryCreateSchema = categorySchema.omit({id: true});
export type TCreateCategory = z.infer<typeof categoryCreateSchema>;
import { z } from "zod";

export const createLTServiceTypeSchema = z.object({
    name: z.string(),
    isActive: z.boolean()
});
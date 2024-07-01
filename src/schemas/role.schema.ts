import { z } from "zod";

export const createRoleSchema = z.object({
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
});
import { z } from "zod";

export const createServiceResultSchema = z.object({
    serviceResultCode: z.string().optional(),
    serviceResultDescription: z.string().optional(),
});
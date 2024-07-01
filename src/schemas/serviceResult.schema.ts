import { z } from "zod";

export const createServiceResultSchema = z.object({
    serviceResultCode: z.string(),
    serviceResultDescription: z.string(),
});
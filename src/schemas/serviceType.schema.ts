import { z } from "zod";

export const createServiceTypeSchema = z.object({
    serviceTypeCode: z.string().optional(),
    serviceTypeDescription: z.string().optional(),
});
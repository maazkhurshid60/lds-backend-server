import { z } from "zod";

export const createServiceTypeSchema = z.object({
    serviceTypeCode: z.string(),
    serviceTypeDescription: z.string(),
});
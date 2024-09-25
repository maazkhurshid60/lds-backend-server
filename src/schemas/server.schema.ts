import { z } from "zod";

export const createServerSchema = z.object({
    serverCode: z.string().min(2),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    deviceCode: z.string().optional(),
    licenseNo: z.any(),
    address1: z.string().optional(),
    address2: z.string().nullable(),
    country: z.string().optional(),
    state: z.string().optional(),
    zip: z.string(),
    phone: z.string().optional(),
    fax: z.any(),
    apt: z.string().optional(),
    isActive: z.boolean()
});
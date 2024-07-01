import { z } from "zod";

export const createServerSchema = z.object({
    serverCode: z.string().min(2),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    deviceCode: z.string().min(1),
    licenseNo: z.number().min(1),
    address1: z.string().min(1),
    address2: z.string().nullable(),
    country: z.string().min(2),
    state: z.string().min(2),
    zip: z.number().min(2),
    phone: z.string().min(7),
    fax: z.string().min(2),
    apt: z.string().min(2),
    isActive: z.boolean()
});
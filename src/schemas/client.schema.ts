import { z } from "zod";

export const createClientSchema = z.object({
    code: z.string().optional(),
    fullName: z.string().optional(),
    mi: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    apt: z.string().optional(),
    isActive: z.boolean().optional(),
});
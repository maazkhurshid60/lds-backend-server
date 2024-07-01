import { z } from "zod";

export const createClientSchema = z.object({
    code: z.string(),
    fullName: z.string(),
    mi: z.string(),
    address1: z.string(),
    address2: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.number(),
    phone: z.string(),
    fax: z.string(),
    apt: z.string(),
    isActive: z.boolean()
});
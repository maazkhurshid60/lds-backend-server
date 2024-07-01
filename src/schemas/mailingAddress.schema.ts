import { z } from "zod";

export const createMailingAddressSchema = z.object({
    firstName: z.string(),
    address: z.string(),
    apt: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.number(),
    rRR: z.boolean(),
});
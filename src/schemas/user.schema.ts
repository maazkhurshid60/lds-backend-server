import { z } from "zod";

export const userRegistrationSchema = z.object({
    userName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
});

export const userLoginSchema = z.object({
    userName: z.string(),
    password: z.string(),
});



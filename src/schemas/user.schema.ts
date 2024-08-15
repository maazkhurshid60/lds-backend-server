import { z } from "zod";

export const userRegistrationSchema = z.object({
    userName: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string(),
});

export const userLoginSchema = z.object({
    userName: z.string(),
    password: z.string(),
});



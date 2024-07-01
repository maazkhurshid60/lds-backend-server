import { z } from "zod";

export const userRegistrationSchema = z.object({
    userName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export const userLoginSchema = z.object({
    userName: z.string(),
    password: z.string(),
});



import { z } from "zod";

export const createStandardServiceTypechema = z.object({
    name: z.string(),
    isActive:  z.boolean()

});
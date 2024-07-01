import { z } from "zod";

export const createSettingSchema = z.object({
    label: z.string(),
    value: z.any()
});
import { z } from "zod";

export const createHolidaySchema = z.object({
    holidayYear: z.number().min(4),
    holidayDate: z.string(),
    holidayDescription: z.string(),
});
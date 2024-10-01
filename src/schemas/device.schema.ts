import { z } from "zod";

export const createDeviceSchema = z.object({
    deviceCode: z.string().optional(),
    deviceName: z.string().optional(),
    productType: z.string().optional(),
    isActive: z.boolean().optional()
});
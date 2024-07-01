import { z } from "zod";

export const createDeviceSchema = z.object({
    deviceCode: z.string().min(3),
    deviceName: z.string().min(3),
    productType: z.string(),
    isActive: z.boolean()
});
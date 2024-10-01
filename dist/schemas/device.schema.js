"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeviceSchema = void 0;
const zod_1 = require("zod");
exports.createDeviceSchema = zod_1.z.object({
    deviceCode: zod_1.z.string().optional(),
    deviceName: zod_1.z.string().optional(),
    productType: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional()
});

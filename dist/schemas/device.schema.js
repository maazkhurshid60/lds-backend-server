"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeviceSchema = void 0;
const zod_1 = require("zod");
exports.createDeviceSchema = zod_1.z.object({
    deviceCode: zod_1.z.string().min(3),
    deviceName: zod_1.z.string().min(3),
    productType: zod_1.z.string(),
    isActive: zod_1.z.boolean()
});

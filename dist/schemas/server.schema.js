"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerSchema = void 0;
const zod_1 = require("zod");
exports.createServerSchema = zod_1.z.object({
    serverCode: zod_1.z.string().optional(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    deviceCode: zod_1.z.string().optional(),
    licenseNo: zod_1.z.any(),
    address1: zod_1.z.string().optional(),
    address2: zod_1.z.string().nullable(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    zip: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    fax: zod_1.z.any(),
    apt: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional()
});

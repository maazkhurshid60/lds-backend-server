"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerSchema = void 0;
const zod_1 = require("zod");
exports.createServerSchema = zod_1.z.object({
    serverCode: zod_1.z.string().min(2),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    deviceCode: zod_1.z.string().min(1),
    licenseNo: zod_1.z.number().min(1),
    address1: zod_1.z.string().min(1),
    address2: zod_1.z.string().nullable(),
    country: zod_1.z.string().min(2),
    state: zod_1.z.string().min(2),
    zip: zod_1.z.string(),
    phone: zod_1.z.string().min(7),
    fax: zod_1.z.string().min(2),
    apt: zod_1.z.string().min(2),
    isActive: zod_1.z.boolean()
});

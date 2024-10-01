"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientSchema = void 0;
const zod_1 = require("zod");
exports.createClientSchema = zod_1.z.object({
    code: zod_1.z.string().optional(),
    fullName: zod_1.z.string().optional(),
    mi: zod_1.z.string().optional(),
    address1: zod_1.z.string().optional(),
    address2: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    zip: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    fax: zod_1.z.string().optional(),
    apt: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});

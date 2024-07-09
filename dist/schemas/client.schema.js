"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientSchema = void 0;
const zod_1 = require("zod");
exports.createClientSchema = zod_1.z.object({
    code: zod_1.z.string(),
    fullName: zod_1.z.string(),
    mi: zod_1.z.string(),
    address1: zod_1.z.string(),
    address2: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    zip: zod_1.z.number(),
    phone: zod_1.z.string(),
    fax: zod_1.z.string(),
    apt: zod_1.z.string(),
    isActive: zod_1.z.boolean()
});

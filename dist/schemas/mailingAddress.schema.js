"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMailingAddressSchema = void 0;
const zod_1 = require("zod");
exports.createMailingAddressSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    apt: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    zip: zod_1.z.string().optional(),
    // rRR: z.boolean(),
});

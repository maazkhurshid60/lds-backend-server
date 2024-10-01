"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMailingAddressSchema = void 0;
const zod_1 = require("zod");
exports.createMailingAddressSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    address: zod_1.z.string(),
    apt: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    zip: zod_1.z.string(),
    // rRR: z.boolean(),
});

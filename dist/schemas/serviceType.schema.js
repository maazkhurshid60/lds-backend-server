"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceTypeSchema = void 0;
const zod_1 = require("zod");
exports.createServiceTypeSchema = zod_1.z.object({
    serviceTypeCode: zod_1.z.string().optional(),
    serviceTypeDescription: zod_1.z.string().optional(),
});

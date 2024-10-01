"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceResultSchema = void 0;
const zod_1 = require("zod");
exports.createServiceResultSchema = zod_1.z.object({
    serviceResultCode: zod_1.z.string().optional(),
    serviceResultDescription: zod_1.z.string().optional(),
});

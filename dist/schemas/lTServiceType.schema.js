"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLTServiceTypeSchema = void 0;
const zod_1 = require("zod");
exports.createLTServiceTypeSchema = zod_1.z.object({
    name: zod_1.z.string(),
    isActive: zod_1.z.boolean()
});

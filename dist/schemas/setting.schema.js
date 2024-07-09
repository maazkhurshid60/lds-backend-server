"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettingSchema = void 0;
const zod_1 = require("zod");
exports.createSettingSchema = zod_1.z.object({
    label: zod_1.z.string(),
    value: zod_1.z.any()
});

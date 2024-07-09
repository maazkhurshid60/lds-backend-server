"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHolidaySchema = void 0;
const zod_1 = require("zod");
exports.createHolidaySchema = zod_1.z.object({
    holidayYear: zod_1.z.number().min(4),
    holidayDate: zod_1.z.string(),
    holidayDescription: zod_1.z.string(),
});

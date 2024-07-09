"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStandardServiceTypechema = void 0;
const zod_1 = require("zod");
exports.createStandardServiceTypechema = zod_1.z.object({
    name: zod_1.z.string(),
});

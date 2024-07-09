"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResultFormSchema = void 0;
const zod_1 = require("zod");
exports.createResultFormSchema = zod_1.z.object({
    queryInformationLT: zod_1.z.any(),
    queryInformationStandard: zod_1.z.any(),
    serviceResults: zod_1.z.any(),
});

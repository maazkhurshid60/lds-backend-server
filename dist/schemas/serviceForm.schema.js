"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceFormSchema = void 0;
const zod_1 = require("zod");
exports.createServiceFormSchema = zod_1.z.object({
    jobNo: zod_1.z.number(),
    inputDate: zod_1.z.string(),
    clientId: zod_1.z.string(),
    serviceType: zod_1.z.string().nullable(),
    caseNo: zod_1.z.number().nullable(),
    caption: zod_1.z.string().nullable(),
    lTServiceType: zod_1.z.string().nullable(),
    otherLTServiceTypeData: zod_1.z.any().nullable(),
    lTServiceDetail: zod_1.z.any().nullable(),
    noOfAddLMailings: zod_1.z.number().nullable(),
    mailingAddresses: zod_1.z.any().nullable(),
    standardServiceType: zod_1.z.string().nullable(),
    otherStandardServiceTypeData: zod_1.z.any().nullable(),
    standardServiceDetail: zod_1.z.any().nullable(),
});

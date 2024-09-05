"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceFormSchema = void 0;
const zod_1 = require("zod");
const mailingAddressSchema = zod_1.z.object({
    address: zod_1.z.string().optional(),
    apt: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().optional(),
    firstName: zod_1.z.string().optional(),
    rRR: zod_1.z.boolean().optional(),
    state: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
    zip: zod_1.z.any().optional(),
    __v: zod_1.z.any().optional(),
    _id: zod_1.z.any().optional(),
});
exports.createServiceFormSchema = zod_1.z.object({
    jobNo: zod_1.z.number().optional(),
    inputDate: zod_1.z.string().optional(),
    clientId: zod_1.z.any().optional(),
    serviceType: zod_1.z.any().optional(),
    caseNo: zod_1.z.number().optional(),
    caption: zod_1.z.string().optional(),
    lTServiceType: zod_1.z.any().optional(),
    // otherLTServiceTypeData: z.number().optional(),
    oLTIndexNo: zod_1.z.any().optional(),
    oLTDescription: zod_1.z.string().optional(),
    // lTServiceDetail: z.number().optional(),
    lTSFirstName: zod_1.z.string().optional(),
    lTSBusinessName: zod_1.z.string().optional(),
    lTSZip: zod_1.z.string().optional(),
    lTSState: zod_1.z.string().optional(),
    lTSCity: zod_1.z.string().optional(),
    lTSApt: zod_1.z.string().optional(),
    lTSAddress: zod_1.z.string().optional(),
    lTSDescription: zod_1.z.string().optional(),
    noOfAddLMailings: zod_1.z.number().optional(),
    mailingAddresses: zod_1.z.array(mailingAddressSchema).optional(),
    standardServiceType: zod_1.z.any().optional(),
    // otherStandardServiceTypeData: z.number().optional(),
    oSSTIndexNo: zod_1.z.any().optional(),
    oSSTDescription: zod_1.z.string().optional(),
    // standardServiceDetail: z.number().optional(),
    sSDCourt: zod_1.z.string().optional(),
    sSDDefendants: zod_1.z.string().optional(),
    sSDPlaintiff: zod_1.z.string().optional(),
    sSDCountry: zod_1.z.string().optional(),
    //Serve to
    // firstNameServe: z.string().optional(),
    // addressServe: z.string().optional(),
    // cityServe: z.string().optional(),
    // stateServe: z.string().optional(),
    // aptServe: z.string().optional(),
    // zipServe: z.string().optional(),
    // serviceFormCreatedBy: z.string().optional(),
    // lastUpdatedBy:z.string().optional()
});

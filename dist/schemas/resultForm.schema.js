"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResultFormSchema = void 0;
const zod_1 = require("zod");
// export const createResultFormSchema = z.object({
//     queryInformationLT: z.any(),
//     queryInformationStandard: z.any(),
//     serviceResults: z.any(),
// });
exports.createResultFormSchema = zod_1.z.object({
    queryInformationLTFullName: zod_1.z.string().optional(),
    queryInformationLTIndexNo: zod_1.z.number().optional(),
    queryInformationLTAddress: zod_1.z.string().optional(),
    queryInformationLTBusinessName: zod_1.z.string().optional(),
    queryInformationLTInputDate: zod_1.z.string().optional(),
    queryInformationStandardServeTo: zod_1.z.string().optional(),
    queryInformationStandardDefendants: zod_1.z.string().optional(),
    serviceResultInputDate: zod_1.z.string().optional(),
    serviceResultScvType: zod_1.z.string().optional(),
    serviceResultClientId: zod_1.z.string().optional(),
    serviceResultJobNo: zod_1.z.number(),
    serviceResultServerId: zod_1.z.string().optional(),
    serviceResultResults: zod_1.z.string().optional(),
    serviceResultDateOfService: zod_1.z.string().optional(),
    serviceResultFirstTimeOfService: zod_1.z.string().optional(),
    serviceResultFirstAttemptDate: zod_1.z.string().optional(),
    serviceResultSecondTimeOfService: zod_1.z.string().optional(),
    serviceResultSecondAttemptDate: zod_1.z.string().optional(),
    serviceResultThirdTimeOfService: zod_1.z.string().optional(),
    serviceResultThirdAttemptDate: zod_1.z.string().optional(),
    serviceResultlTServed: zod_1.z.string().optional(),
    serviceResultlTNotServed: zod_1.z.string().optional(),
    serviceResultRecipientTitle: zod_1.z.string().optional(),
    serviceResultRecipient: zod_1.z.string().optional(),
    serviceResultDoor: zod_1.z.number().optional().nullable(),
    serviceResultDoorLocks: zod_1.z.number().optional().nullable(),
    serviceResultEntry: zod_1.z.number().optional().nullable(),
    serviceResultWall: zod_1.z.number().optional().nullable(),
    serviceResultFloor: zod_1.z.number().optional().nullable(),
    serviceResultLock: zod_1.z.number().optional().nullable(),
    serviceResultOtherDescription: zod_1.z.boolean().optional(),
    serviceResultSex: zod_1.z.string().optional(),
    serviceResultSkinColor: zod_1.z.string().optional(),
    serviceResultHair: zod_1.z.string().optional(),
    serviceResultAge: zod_1.z.number().optional().nullable(),
    serviceResultHeight: zod_1.z.number().optional().nullable(),
    serviceResultWeight: zod_1.z.number().optional().nullable(),
    serviceResultOtherFeatures: zod_1.z.string().optional(),
    serviceResultDateOfMailing: zod_1.z.string().optional(),
    serviceResultDateOfNotary: zod_1.z.string().optional(),
});

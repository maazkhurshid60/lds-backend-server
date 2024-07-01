import { z } from "zod";

export const createServiceFormSchema = z.object({
    jobNo: z.number(),
    inputDate: z.string(),
    clientId: z.string(),
    serviceType: z.string().nullable(),
    caseNo: z.number().nullable(),
    caption: z.string().nullable(),
    lTServiceType: z.string().nullable(),
    otherLTServiceTypeData: z.any().nullable(),
    lTServiceDetail: z.any().nullable(),
    noOfAddLMailings: z.number().nullable(),
    mailingAddresses: z.any().nullable(),
    standardServiceType: z.string().nullable(),
    otherStandardServiceTypeData: z.any().nullable(),
    standardServiceDetail: z.any().nullable(),
});
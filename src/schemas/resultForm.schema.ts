import { z } from "zod";

export const createResultFormSchema = z.object({
    queryInformationLT: z.any(),
    queryInformationStandard: z.any(),
    serviceResults: z.any(),
});
import mongoose, {Schema} from "mongoose";

export interface IResultFormDocument extends mongoose.Document {
    queryInformationLT: any,
    queryInformationStandard: any,
    serviceResults: any
}

const resultFormSchema: Schema<IResultFormDocument> = new Schema(
    {
        queryInformationLT: {
            type: Schema.Types.Map
        },
        queryInformationStandard: {
            type: Schema.Types.Map,
        },
        serviceResults: {
            type: Schema.Types.Map
        },
    },
    {
        timestamps: true
    }
);


export const ResultForm = mongoose.model<IResultFormDocument>("ResultForm", resultFormSchema);
import mongoose, {Schema} from "mongoose";

export interface IServiceTypeDocument extends mongoose.Document {
    serviceTypeCode: string,
    serviceTypeDescription: string
}

const serviceTypeSchema: Schema<IServiceTypeDocument> = new Schema(
    {
        serviceTypeCode : {
            type: String,
            required: [true, "Service type code is required"],
            trim: true,
        },
        serviceTypeDescription: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);


export const ServiceType = mongoose.model<IServiceTypeDocument>("ServiceType", serviceTypeSchema);
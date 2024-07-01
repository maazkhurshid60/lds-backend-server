import mongoose, {Schema} from "mongoose";

export interface IServiceResultDocument extends mongoose.Document {
    serviceResultCode: string,
    serviceResultDescription: string,
}

const serviceResultSchema: Schema<IServiceResultDocument> = new Schema(
    {
        serviceResultCode : {
            type: String,
            required: [true, "Service result code is required"],
            trim: true,
        },
        serviceResultDescription: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);


export const ServiceResult = mongoose.model<IServiceResultDocument>("ServiceResult", serviceResultSchema);
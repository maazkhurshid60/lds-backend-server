import mongoose, {Schema} from "mongoose";

export interface ILTServiceTypeDocument extends mongoose.Document {
    name: string,
    isActive: boolean
}

const lTserviceTypeSchema: Schema<ILTServiceTypeDocument> = new Schema(
    {
        name : {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true
    }
);


export const LTServiceType = mongoose.model<ILTServiceTypeDocument>("LTServiceType", lTserviceTypeSchema);
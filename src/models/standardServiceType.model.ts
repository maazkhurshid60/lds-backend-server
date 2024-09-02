import mongoose, {Schema} from "mongoose";

export interface IStandardServiceDocument extends mongoose.Document {
    name: string,
    isActive:boolean
}

const standardServiceTypeSchema: Schema<IStandardServiceDocument> = new Schema(
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

export const StandardServiceType = mongoose.model<IStandardServiceDocument>("StandardServiceType", standardServiceTypeSchema);
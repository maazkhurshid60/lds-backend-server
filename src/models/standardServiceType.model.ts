import mongoose, {Schema} from "mongoose";

export interface IStandardServiceDocument extends mongoose.Document {
    name: string,
}

const standardServiceTypeSchema: Schema<IStandardServiceDocument> = new Schema(
    {
        name : {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

export const StandardServiceType = mongoose.model<IStandardServiceDocument>("StandardServiceType", standardServiceTypeSchema);
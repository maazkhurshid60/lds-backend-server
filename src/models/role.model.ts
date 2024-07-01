import mongoose, {Schema} from "mongoose";

export interface IRoleDocument extends mongoose.Document {
    name: string,
    description: string,
    isActive: boolean
}

const roleSchema: Schema<IRoleDocument> = new Schema(
    {
        name : {
            type: String,
            required: [true, "name is required"],
            trim: true,
        },
        description: {
            type: String,
            required: true,
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


export const Role = mongoose.model<IRoleDocument>("Role", roleSchema);
import mongoose, {Schema} from "mongoose";

const roleSchema = new Schema(
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


export const Role = mongoose.model("Role", roleSchema);
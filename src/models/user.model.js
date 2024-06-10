import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        userName : {
            type: String,
            required: [true, "Username is required"],
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
        },
        //role
        isActive: {
            type: Boolean,
            default: true,
        }

    },
    {
        timestamps: true
    }
);


export const User = mongoose.model("User", userSchema);
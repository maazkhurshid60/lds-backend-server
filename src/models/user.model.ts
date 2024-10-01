import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends mongoose.Document {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    roles: any[],
    isActive: boolean
}

const userSchema: Schema<IUserDocument> = new Schema(
    {
        userName: {
            type: String,
            // required: [true, "Username is required"],
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
            // lowercase: true
        },
        password: {
            type: String,
            // required: true,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
                // required: true
            }
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },

    {
        timestamps: true
    }
);

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model<IUserDocument>("User", userSchema);
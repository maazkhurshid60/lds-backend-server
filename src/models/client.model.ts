import mongoose, { Schema } from "mongoose";

export interface IClientDocument extends mongoose.Document {
    code: string,
    fullName: string,
    mi: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    fax: string,
    apt: string,
    isActive: boolean
}

const clientSchema: Schema<IClientDocument> = new Schema(
    {
        code: {
            type: String,
            // required: [true, "Server code is required"],
            trim: true,
        },
        fullName: {
            type: String,
            trim: true,
        },
        mi: {
            type: String,
            trim: true,
        },
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String
        },
        zip: {
            type: String,
        },
        phone: {
            type: String,
        },
        fax: {
            type: String,
        },
        apt: {
            type: String,
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


export const Client = mongoose.model<IClientDocument>("Client", clientSchema);
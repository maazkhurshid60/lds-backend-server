import mongoose, { Schema } from "mongoose";

export interface IServerDocument extends mongoose.Document {
    serverCode: string,
    firstName: string,
    lastName: string,
    deviceCode: string,
    licenseNo: number,
    address1: string,
    address2: string,
    country: string,
    state: string,
    zip: string,
    phone: string,
    fax: string,
    apt: string,
    isActive: boolean
}

const serverSchema: Schema<IServerDocument> = new Schema(
    {
        serverCode: {
            type: String,
            // required: [true, "Server code is required"],
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
        deviceCode: {
            type: String,
        },
        licenseNo: {
            type: Number,
        },
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
        country: {
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
        },
    },
    {
        timestamps: true
    }
);


export const Server = mongoose.model<IServerDocument>("Server", serverSchema);
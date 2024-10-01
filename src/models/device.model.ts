import mongoose, { Schema } from "mongoose";

export interface IDeviceDocument extends mongoose.Document {
    deviceId: string,
    deviceCode: string,
    deviceName: string,
    productType: string,
    isActive: boolean,
}

const deviceSchema: Schema<IDeviceDocument> = new Schema(
    {
        deviceId: {
            type: String,
            // required: [true, "Device Id is required"],
        },
        deviceCode: {
            type: String,
            // required: true,
        },
        deviceName: {
            type: String,
        },
        productType: {
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


export const Device = mongoose.model<IDeviceDocument>("Device", deviceSchema);
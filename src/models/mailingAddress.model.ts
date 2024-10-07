import mongoose, { Schema } from "mongoose";

export interface IMailingAddressDocument extends mongoose.Document {
    firstName?: string,
    address?: string,
    apt?: string,
    city?: string,
    state?: string,
    zip?: string,
    // rRR?: boolean,
}

const mailingAddressSchema: Schema<IMailingAddressDocument> = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
        },
        apt: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        }
        // ,
        // rRR: {
        //     type: Boolean
        // },
    },
    {
        timestamps: true
    }
);


export const MailingAddress = mongoose.model<IMailingAddressDocument>("MailingAddress", mailingAddressSchema);
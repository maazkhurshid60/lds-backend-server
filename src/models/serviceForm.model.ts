import mongoose, {Schema} from "mongoose";

export interface IServiceFormDocument extends mongoose.Document {
    jobNo: number,
    inputDate: string,
    clientId: any,
    serviceType: any,
    caseNo: number,
    caption: string,
    lTServiceType: any,
    otherLTServiceTypeData: any,
    lTServiceDetail: any,
    noOfAddLMailings: number,
    mailingAddresses: any,
    standardServiceType: any,
    otherStandardServiceTypeData: any,
    standardServiceDetail: any,
    serviceFormCreatedBy: any,
    lastUpdatedBy:any
}

const serviceFormSchema = new Schema(
    {
        jobNo : {
            type: Number,
            required: [true, "Job no is required"],
        },
        inputDate: {
            type: String,
            required: true,
        },
        clientId: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        serviceType: {
            type: Schema.Types.ObjectId,
            ref: "ServiceType",
        },
        caseNo: {
            type: Number,
        },
        caption: {
            type: String,
            default: '',
        },
        lTServiceType: {
            type: Schema.Types.ObjectId,
            ref: "LTServiceType"
        },
        otherLTServiceTypeData: {
            type: Schema.Types.Map
        },
        lTServiceDetail: {
            type: Schema.Types.Map
        },
        noOfAddLMailings: {
            type: Number,
        },
        mailingAddresses: [
            {
                type: Schema.Types.Map,
            }
        ],
        standardServiceType: {
            type: Schema.Types.ObjectId,
            ref: "StandardServiceType"
        },
        otherStandardServiceTypeData: {
            type: Schema.Types.Map
        },
        standardServiceDetail: {
            type: Schema.Types.Map
        },
        serviceFormCreatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        lastUpdatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    
    {
        timestamps: true
    }
);


export const ServiceForm = mongoose.model("ServiceForm", serviceFormSchema);
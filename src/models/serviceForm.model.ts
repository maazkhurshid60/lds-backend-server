import mongoose, {Schema} from "mongoose";

export interface IServiceFormDocument extends mongoose.Document {
    jobNo: number,
    inputDate: string,
    clientId: any,
    serviceType: any,
    caseNo: number,
    caption: string,
    lTServiceType: any,
    // otherLTServiceTypeData: any,
    oLTIndexNo: number,
    oLTDescription: string,
    // lTServiceDetail: any,
    lTSFirstName: string,
    lTSBusinessName: string,
    lTSZip: string,
    lTSState: string,
    lTSCity: string,
    lTSApt: string,
    lTSAddress: string,
    lTSDescription: string,
    noOfAddLMailings: number,
    mailingAddresses: any,
    standardServiceType: any,
    // otherStandardServiceTypeData: any,
    oSSTIndexNo: number,
    oSSTDescription: string,
    // standardServiceDetail: any,
    sSDCourt: string,
    sSDDefendants: string,
    sSDPlaintiff: string,
    sSDCountry: string,
    //Serve to
    firstNameServe: string,
    addressServe: string,
    cityServe: string,
    stateServe: string,
    aptServe: string,
    zipServe: string,
    serviceFormCreatedBy: any,
    lastUpdatedBy:any,
    resultFormId?: string,
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
        // otherLTServiceTypeData: {
        //     type: Schema.Types.Map
        // },
        oLTIndexNo: {
            type: Schema.Types.Number,
        },
        oLTDescription: {
            type: Schema.Types.String
        },
        // lTServiceDetail: {
        //     type: Schema.Types.Map
        // },
        lTSFirstName: {
            type: Schema.Types.String
        },
        lTSBusinessName: {
            type: Schema.Types.String
        },
        lTSZip: {
            type: Schema.Types.String
        },
        lTSState: {
            type: Schema.Types.String
        },
        lTSCity: {
            type: Schema.Types.String
        },
        lTSApt: {
            type: Schema.Types.String
        },
        lTSAddress: {
            type: Schema.Types.String
        },
        lTSDescription: {
            type: Schema.Types.String
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
        // otherStandardServiceTypeData: {
        //     type: Schema.Types.Map
        // },
        oSSTIndexNo: {
            type: Schema.Types.Number,
        },
        oSSTDescription: {
            type: Schema.Types.String
        },
        // standardServiceDetail: {
        //     type: Schema.Types.Map
        // },
        sSDCourt: {
            type: Schema.Types.String
        },
        sSDDefendants: {
            type: Schema.Types.String
        },
        sSDPlaintiff: {
            type: Schema.Types.String
        },
        sSDCountry: {
            type: Schema.Types.String
        },
        firstNameServe: {
            type: Schema.Types.String
        },
        addressServe: {
            type: Schema.Types.String
        },
        cityServe: {
            type: Schema.Types.String
        },
        stateServe: {
            type: Schema.Types.String
        },
        aptServe: {
            type: Schema.Types.String
        },
        zipServe: {
            type: Schema.Types.String
        },
        serviceFormCreatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        lastUpdatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        resultFormId: {
            type: Schema.Types.ObjectId,
            ref: "ResultForm",
            required: false,
        }
    },
    
    {
        timestamps: true
    }
);


export const ServiceForm = mongoose.model("ServiceForm", serviceFormSchema);
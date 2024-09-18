import mongoose, { Schema } from "mongoose";

export interface IServiceFormDocument extends mongoose.Document {
    jobNo: number,
    inputDate: string,
    clientId: any,
    serviceType: any,
    caseNo: number,
    caption: string,
    lTServiceType: any,
    oLTIndexNo: any,
    oLTDescription: string,
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
    oSSTIndexNo: any,
    oSSTDescription: string,
    sSDCourt: string,
    sSDDefendants: string,
    sSDPlaintiff: string,
    sSDCountry: string,
    serviceFormCreatedBy: any,
    lastUpdatedBy: any,

    //Result Form Attributes
    queryInformationLTFullName: string,
    queryInformationLTIndexNo: number,
    queryInformationLTAddress: string,
    queryInformationLTBusinessName: string,
    queryInformationLTInputDate: string,
    queryInformationStandardServeTo: string,
    queryInformationStandardDefendants: string,
    serviceResultInputDate: string,
    serviceResultScvType: string,
    serviceResultClientId: any,
    serviceResultJobNo: number,
    serviceResultServerId: any,
    serviceResultResults: string,
    serviceResultDateOfService: string,
    serviceResultFirstTimeOfService: string,
    serviceResultFirstAttemptDate: string,
    serviceResultSecondTimeOfService: string,
    serviceResultSecondAttemptDate: string,
    serviceResultThirdTimeOfService: string,
    serviceResultThirdAttemptDate: string,
    serviceResultlTServed: string,
    serviceResultlTNotServed: string,
    serviceResultSubstitudeDeliveredTo: string,
    serviceResultRecipientTitle: string,
    serviceResultRecipient: string,
    serviceResultDoor: number,
    serviceResultDoorLocks: number,
    serviceResultEntry: number,
    serviceResultWall: number,
    serviceResultFloor: number,
    serviceResultLock: number,
    serviceResultOtherDescription: boolean,
    serviceResultSex: string,
    serviceResultSkinColor: string,
    serviceResultHair: string,
    serviceResultAge: number,
    serviceResultHeight: number,
    serviceResultWeight: number,
    serviceResultOtherFeatures: string,
    serviceResultDateOfMailing: string,
    serviceResultDateOfNotary: string,
    serviceResultTimeOfService: string,
    substituteDeliveredTo: string,
    corporateRecipient: string,
}

const serviceFormSchema = new Schema(
    {
        jobNo: {
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
        oLTIndexNo: {
            type: Schema.Types.String,
        },
        oLTDescription: {
            type: Schema.Types.String
        },
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
        oSSTIndexNo: {
            type: Schema.Types.String,
        },
        oSSTDescription: {
            type: Schema.Types.String
        },
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

        //Result Form Attributes
        queryInformationLTFullName: {
            type: Schema.Types.String,
            required: false,
        },
        queryInformationLTIndexNo: {
            type: Schema.Types.Number,
            required: false,
        },

        queryInformationLTAddress: {
            type: Schema.Types.String,
            required: false,
        },
        queryInformationLTBusinessName: {
            type: Schema.Types.String,
        },
        queryInformationLTInputDate: {
            type: Schema.Types.String,
        },
        queryInformationStandardServeTo: {
            type: Schema.Types.String,
        },
        queryInformationStandardDefendants: {
            type: Schema.Types.String,
        },
        serviceResultInputDate: {
            type: Schema.Types.String,
        },
        serviceResultAge: {
            type: Schema.Types.Number,
        },
        serviceResultClientId: {
            type: Schema.Types.ObjectId,
            ref: "Client",
            required: false
        },
        serviceResultDateOfMailing: {
            type: Schema.Types.String,
        },
        serviceResultDateOfNotary: {
            type: Schema.Types.String,
        },
        serviceResultDateOfService: {
            type: Schema.Types.String,
        },
        serviceResultDoor: {
            type: Schema.Types.Number,
        },
        serviceResultDoorLocks: {
            type: Schema.Types.Number,
        },
        serviceResultEntry: {
            type: Schema.Types.Number,
        },
        serviceResultFirstAttemptDate: {
            type: Schema.Types.String,
        },
        serviceResultFirstTimeOfService: {
            type: Schema.Types.String,
        },
        serviceResultFloor: {
            type: Schema.Types.Number,
        },
        serviceResultHair: {
            type: Schema.Types.String,
        },
        serviceResultHeight: {
            type: Schema.Types.Number,
        },
        serviceResultJobNo: {
            type: Schema.Types.Number,
        },
        serviceResultLock: {
            type: Schema.Types.Number,
        },
        serviceResultlTNotServed: {
            type: Schema.Types.String,
        },
        serviceResultlTServed: {
            type: Schema.Types.String,
        },
        serviceResultOtherDescription: {
            type: Schema.Types.Boolean,
        },
        serviceResultOtherFeatures: {
            type: Schema.Types.String,
        },
        serviceResultSubstitudeDeliveredTo: {
            type: Schema.Types.String
        },
        serviceResultRecipient: {
            type: Schema.Types.String
        },
        serviceResultRecipientTitle: {
            type: Schema.Types.String,
        },
        serviceResultResults: {
            type: Schema.Types.String,
        },
        serviceResultScvType: {
            type: Schema.Types.String,
        },
        serviceResultSecondAttemptDate: {
            type: Schema.Types.String,
        },
        serviceResultSecondTimeOfService: {
            type: Schema.Types.String,
        },
        serviceResultServerId: {
            type: Schema.Types.ObjectId,
            ref: "Server",
            required: false
        },
        serviceResultSex: {
            type: Schema.Types.String,
        },
        serviceResultSkinColor: {
            type: Schema.Types.String,
        },
        serviceResultThirdAttemptDate: {
            type: Schema.Types.String,
        },
        serviceResultThirdTimeOfService: {
            type: Schema.Types.String,
        },
        serviceResultWall: {
            type: Schema.Types.Number,
        },
        serviceResultWeight: {
            type: Schema.Types.Number,
        },
        serviceResultTimeOfService: {
            type: Schema.Types.String
        },
        substituteDeliveredTo: {
            type: Schema.Types.String
        },
        corporateRecipient: {
            type: Schema.Types.String
        }

    },

    {
        timestamps: true
    }
);


export const ServiceForm = mongoose.model("ServiceForm", serviceFormSchema);
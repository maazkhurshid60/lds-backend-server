import mongoose, { Schema } from "mongoose";

export interface IResultFormDocument extends mongoose.Document {
    // queryInformationLT: any,
    queryInformationLTFullName: string,
    queryInformationLTIndexNo: number,
    queryInformationLTAddress: string,
    queryInformationLTBusinessName: string,
    queryInformationLTInputDate: string,
    // queryInformationStandard: any,
    queryInformationStandardServeTo: string,
    queryInformationStandardDefendants: string,
    // serviceResults: any
    serviceResultInputDate: string,
    serviceResultScvType: string,
    serviceResultClientId: string,
    serviceResultJobNo: number,
    serviceResultServerId: string,
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
    serviceResultRecipientTitle: string,
    serviceResultDoor: number,
    serviceResultDoorLocks: number,
    serviceResultEntry: number,
    serviceResultWall: number,
    serviceResultFloor: number,
    serviceResultLock: number,
    serviceResultOtherDescription: string,
    serviceResultSex: string,
    serviceResultSkinColor: string,
    serviceResultHair: string,
    serviceResultAge: number,
    serviceResultHeight: number,
    serviceResultWeight: number,
    serviceResultOtherFeatures: string,
    serviceResultDateOfMailing: string,
    serviceResultDateOfNotary: string,
}

const resultFormSchema: Schema<IResultFormDocument> = new Schema(
    {
        queryInformationLTFullName: {
            type: Schema.Types.String,
            required: [true, "Full Name no is required"],
        },
        queryInformationLTIndexNo: {
            type: Schema.Types.Number,
            required: [true, "Index no is required"],
        },

        queryInformationLTAddress: {
            type: Schema.Types.String,
            required: [true, "Index no is required"],
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
            type: Schema.Types.Number, // Needs to be Number
        },
        serviceResultClientId: {
            type: Schema.Types.String,
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
            type: Schema.Types.Number, // Number
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
            type: Schema.Types.String,
        },
        serviceResultOtherFeatures: {
            type: Schema.Types.String,
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
            type: Schema.Types.String,
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
    },
    {
        timestamps: true
    }
);


export const ResultForm = mongoose.model<IResultFormDocument>("ResultForm", resultFormSchema);
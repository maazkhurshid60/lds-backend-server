"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceForm = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const serviceFormSchema = new mongoose_1.Schema({
    jobNo: {
        type: Number,
        required: [true, "Job no is required"],
    },
    inputDate: {
        type: String,
        required: true,
    },
    clientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    serviceType: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "LTServiceType"
    },
    oLTIndexNo: {
        type: mongoose_1.Schema.Types.String,
    },
    oLTDescription: {
        type: mongoose_1.Schema.Types.String
    },
    lTSFirstName: {
        type: mongoose_1.Schema.Types.String
    },
    lTSBusinessName: {
        type: mongoose_1.Schema.Types.String
    },
    lTSZip: {
        type: mongoose_1.Schema.Types.String
    },
    lTSState: {
        type: mongoose_1.Schema.Types.String
    },
    lTSCity: {
        type: mongoose_1.Schema.Types.String
    },
    lTSApt: {
        type: mongoose_1.Schema.Types.String
    },
    lTSAddress: {
        type: mongoose_1.Schema.Types.String
    },
    lTSDescription: {
        type: mongoose_1.Schema.Types.String
    },
    noOfAddLMailings: {
        type: Number,
    },
    mailingAddresses: [
        {
            type: mongoose_1.Schema.Types.Map,
        }
    ],
    standardServiceType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "StandardServiceType"
    },
    oSSTIndexNo: {
        type: mongoose_1.Schema.Types.String,
    },
    oSSTDescription: {
        type: mongoose_1.Schema.Types.String
    },
    sSDCourt: {
        type: mongoose_1.Schema.Types.String
    },
    sSDDefendants: {
        type: mongoose_1.Schema.Types.String
    },
    sSDPlaintiff: {
        type: mongoose_1.Schema.Types.String
    },
    sSDCountry: {
        type: mongoose_1.Schema.Types.String
    },
    firstNameServe: {
        type: mongoose_1.Schema.Types.String
    },
    addressServe: {
        type: mongoose_1.Schema.Types.String
    },
    cityServe: {
        type: mongoose_1.Schema.Types.String
    },
    stateServe: {
        type: mongoose_1.Schema.Types.String
    },
    aptServe: {
        type: mongoose_1.Schema.Types.String
    },
    zipServe: {
        type: mongoose_1.Schema.Types.String
    },
    serviceFormCreatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    lastUpdatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    //Result Form Attributes
    queryInformationLTFullName: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    queryInformationLTIndexNo: {
        type: mongoose_1.Schema.Types.Number,
        required: false,
    },
    queryInformationLTAddress: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    queryInformationLTBusinessName: {
        type: mongoose_1.Schema.Types.String,
    },
    queryInformationLTInputDate: {
        type: mongoose_1.Schema.Types.String,
    },
    queryInformationStandardServeTo: {
        type: mongoose_1.Schema.Types.String,
    },
    queryInformationStandardDefendants: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultInputDate: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultAge: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultClientId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Client",
        required: false
    },
    serviceResultDateOfMailing: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultDateOfNotary: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultDateOfService: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultDoor: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultDoorLocks: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultEntry: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultFirstAttemptDate: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultFirstTimeOfService: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultFloor: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultHair: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultHeight: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultJobNo: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultLock: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultlTNotServed: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultlTServed: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultOtherDescription: {
        type: mongoose_1.Schema.Types.Boolean,
    },
    serviceResultOtherFeatures: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultSubstitudeDeliveredTo: {
        type: mongoose_1.Schema.Types.String
    },
    serviceResultRecipient: {
        type: mongoose_1.Schema.Types.String
    },
    serviceResultRecipientTitle: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultResults: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultScvType: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultSecondAttemptDate: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultSecondTimeOfService: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultServerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Server",
        required: false
    },
    serviceResultSex: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultSkinColor: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultThirdAttemptDate: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultThirdTimeOfService: {
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultWall: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultWeight: {
        type: mongoose_1.Schema.Types.Number,
    },
    serviceResultTimeOfService: {
        type: mongoose_1.Schema.Types.String
    },
    substituteDeliveredTo: {
        type: mongoose_1.Schema.Types.String
    },
    corporateRecipient: {
        type: mongoose_1.Schema.Types.String
    }
}, {
    timestamps: true
});
exports.ServiceForm = mongoose_1.default.model("ServiceForm", serviceFormSchema);

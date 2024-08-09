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
exports.ResultForm = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const resultFormSchema = new mongoose_1.Schema({
    queryInformationLTFullName: {
        type: mongoose_1.Schema.Types.String,
        required: [true, "Full Name no is required"],
    },
    queryInformationLTIndexNo: {
        type: mongoose_1.Schema.Types.Number,
        required: [true, "Index no is required"],
    },
    queryInformationLTAddress: {
        type: mongoose_1.Schema.Types.String,
        required: [true, "Index no is required"],
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
        type: mongoose_1.Schema.Types.Number, // Needs to be Number
    },
    serviceResultClientId: {
        type: mongoose_1.Schema.Types.String,
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
        type: mongoose_1.Schema.Types.Number, // Number
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
        type: mongoose_1.Schema.Types.String,
    },
    serviceResultOtherFeatures: {
        type: mongoose_1.Schema.Types.String,
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
        type: mongoose_1.Schema.Types.String,
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
}, {
    timestamps: true
});
exports.ResultForm = mongoose_1.default.model("ResultForm", resultFormSchema);

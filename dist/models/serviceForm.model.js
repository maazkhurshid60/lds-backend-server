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
    // otherLTServiceTypeData: {
    //     type: Schema.Types.Map
    // },
    oLTIndexNo: {
        type: mongoose_1.Schema.Types.Number,
    },
    oLTDescription: {
        type: mongoose_1.Schema.Types.String
    },
    // lTServiceDetail: {
    //     type: Schema.Types.Map
    // },
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
    // otherStandardServiceTypeData: {
    //     type: Schema.Types.Map
    // },
    oSSTIndexNo: {
        type: mongoose_1.Schema.Types.Number,
    },
    oSSTDescription: {
        type: mongoose_1.Schema.Types.String
    },
    // standardServiceDetail: {
    //     type: Schema.Types.Map
    // },
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
    resultFormId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ResultForm",
        required: false,
    }
}, {
    timestamps: true
});
exports.ServiceForm = mongoose_1.default.model("ServiceForm", serviceFormSchema);

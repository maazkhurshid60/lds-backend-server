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
    otherLTServiceTypeData: {
        type: mongoose_1.Schema.Types.Map
    },
    lTServiceDetail: {
        type: mongoose_1.Schema.Types.Map
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
    otherStandardServiceTypeData: {
        type: mongoose_1.Schema.Types.Map
    },
    standardServiceDetail: {
        type: mongoose_1.Schema.Types.Map
    },
    serviceFormCreatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    lastUpdatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});
exports.ServiceForm = mongoose_1.default.model("ServiceForm", serviceFormSchema);

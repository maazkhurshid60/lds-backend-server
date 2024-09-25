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
exports.Server = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const serverSchema = new mongoose_1.Schema({
    serverCode: {
        type: String,
        required: [true, "Server code is required"],
        trim: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    deviceCode: {
        type: String,
    },
    licenseNo: {
        type: Number,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String
    },
    zip: {
        type: String,
    },
    phone: {
        type: String,
    },
    fax: {
        type: String,
    },
    apt: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
}, {
    timestamps: true
});
exports.Server = mongoose_1.default.model("Server", serverSchema);

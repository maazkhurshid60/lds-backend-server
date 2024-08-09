"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionToDB = async () => {
    try {
        const connectionInstance = await mongoose_1.default.connect(`${process.env.MONGODB_CONNECTION_URL}/${process.env.MONGODB_DATABASE_NAME}`);
        console.log(`MONGODB CONNECTED!! -- DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB CONNECTION FAILED: ", error);
        process.exit(1);
    }
};
exports.default = connectionToDB;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionToDB = async () => {
    try {
        let connectionInstance;
        if (process.env.NODE_ENV === 'PRODUCTION') {
            console.log('IN PRODUCTION');
            connectionInstance = await mongoose_1.default.connect(`${process.env.MONGODB_PRODUCTION_CONNECTION_URL}`);
        }
        else if (process.env.NODE_ENV === 'STAGING') {
            console.log('IN STAGING');
            connectionInstance = await mongoose_1.default.connect(`${process.env.MONGODB_STAGING_CONNECTION_URL}/${process.env.MONGODB_DATABASE_NAME}`);
        }
        else {
            //LOCAL DEV
            console.log('IN LOCAL DEV');
            connectionInstance = await mongoose_1.default.connect(`${process.env.MONGODB_LOCAL_CONNECTION_URL}/${process.env.MONGODB_DATABASE_NAME}`);
        }
        console.log(`MONGODB CONNECTED!! -- DB HOST: ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.log("MONGODB CONNECTION FAILED: ", error);
        process.exit(1);
    }
};
exports.default = connectionToDB;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.checkIsUserPasswordCorrect = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkIsUserPasswordCorrect = async (hashedPass, pass) => {
    return await bcrypt_1.default.compare(pass, hashedPass);
};
exports.checkIsUserPasswordCorrect = checkIsUserPasswordCorrect;
const generateAccessToken = async (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles,
        isActive: user.isActive
    }, "lds-secret-123875438-key", {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};
exports.generateAccessToken = generateAccessToken;

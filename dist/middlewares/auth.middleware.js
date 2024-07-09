"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const ApiError_1 = require("../utils/ApiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const AsyncHandler_1 = require("../utils/AsyncHandler");
const http_status_codes_1 = require("http-status-codes");
exports.verifyJWT = (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized Access");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, "lds-secret-123875438-key");
        const userId = decodedToken._id;
        const user = await user_model_1.User.findById(userId).select("-password").populate(["roles"]);
        if (!user) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid Access Token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid Access Token");
    }
});

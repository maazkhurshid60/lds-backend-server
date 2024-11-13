"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllServerStateApi = exports.updateServerApi = exports.setServerApi = void 0;
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = require("../utils/ApiResponse");
const AsyncHandler_1 = require("../utils/AsyncHandler");
const serverDown_model_1 = require("../models/serverDown.model");
exports.setServerApi = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    // Check and type-cast the request body
    const { serverDownStatus } = req.body;
    const setServerState = await serverDown_model_1.serverDown.create({
        serverDownStatus
    });
    if (!setServerState) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while changing state of server.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, setServerState, "Server State has been changed"));
});
exports.updateServerApi = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serverDownStatus, statusId } = req.body;
    // Check if serverDownStatus is provided and is a boolean
    if (typeof serverDownStatus !== 'boolean') {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "'serverDownStatus' must be a boolean.");
    }
    const updatedServerStatus = await serverDown_model_1.serverDown.findByIdAndUpdate(statusId, {
        $set: {
            serverDownStatus
        }
    }, {
        new: true,
    });
    // If no server state was found, return an error
    if (!updatedServerStatus) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Some thing went Wrong");
    }
    // Return the updated server state as a response
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, exports.updateServerApi, "Server state has been successfully updated."));
});
// Fetch all server states
exports.getAllServerStateApi = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    // Find all the server states in the collection
    const serverStates = await serverDown_model_1.serverDown.find();
    // If no server states are found, return an error
    if (!serverStates || serverStates.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No server states found.");
    }
    // Return the list of server states
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, serverStates, "All server states retrieved successfully."));
});

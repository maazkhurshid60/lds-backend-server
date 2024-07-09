"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServiceResult = exports.getAllServiceResults = exports.updateServiceResult = exports.deleteServiceResult = exports.createServiceResult = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const serviceResults_model_1 = require("../models/serviceResults.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createServiceResult = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceResultCode, serviceResultDescription } = req.body;
    if (!serviceResultCode || !serviceResultDescription) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if (typeof serviceResultCode !== "string" || typeof serviceResultDescription !== "string") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid data types");
    }
    const newCreatedServiceResult = await serviceResults_model_1.ServiceResult.create({
        serviceResultCode,
        serviceResultDescription
    });
    if (!newCreatedServiceResult) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new service result.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newCreatedServiceResult, "New service result created successfully"));
});
exports.createServiceResult = createServiceResult;
const deleteServiceResult = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceResultId } = req.body;
    if (!serviceResultId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Service result id is required");
    }
    await serviceResults_model_1.ServiceResult.findByIdAndDelete(serviceResultId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Service Result has been deleted successfully."));
});
exports.deleteServiceResult = deleteServiceResult;
const updateServiceResult = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceResultId, serviceResultCode, serviceResultDescription } = req.body;
    if ([serviceResultId, serviceResultCode, serviceResultDescription].some((field) => field?.trim() === "")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if ([serviceResultId, serviceResultCode, serviceResultDescription].some((field) => typeof field !== "string")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid data provided");
    }
    const updatedServiceResult = await serviceResults_model_1.ServiceResult.findByIdAndUpdate(serviceResultId, {
        $set: {
            serviceResultCode,
            serviceResultDescription
        }
    }, {
        new: true
    });
    if (!updatedServiceResult) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the service result");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedServiceResult, "Service result has been updated"));
});
exports.updateServiceResult = updateServiceResult;
const getAllServiceResults = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allServiceResults = await serviceResults_model_1.ServiceResult.find({});
    if (!allServiceResults) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service results");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allServiceResults, "Fetched all service results successfully"));
});
exports.getAllServiceResults = getAllServiceResults;
const searchServiceResult = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await serviceResults_model_1.ServiceResult.find({
        $or: [
            { serviceResultCode: {
                    $regex: searchQuery
                } },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Service Result found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchServiceResult = searchServiceResult;

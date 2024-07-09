"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServiceType = exports.getAllServiceTypes = exports.deleteServiceType = exports.updateServiceType = exports.createServiceType = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const serviceType_model_1 = require("../models/serviceType.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceTypeCode, serviceTypeDescription } = req.body;
    if (!serviceTypeCode || !serviceTypeDescription) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if (typeof serviceTypeCode !== "string" || typeof serviceTypeDescription !== "string") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid data types");
    }
    const newCreatedServiceType = await serviceType_model_1.ServiceType.create({
        serviceTypeCode,
        serviceTypeDescription
    });
    if (!newCreatedServiceType) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new service type.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newCreatedServiceType, "New service type created successfully"));
});
exports.createServiceType = createServiceType;
const deleteServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceTypeId } = req.body;
    if (!serviceTypeId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Service type id is required");
    }
    await serviceType_model_1.ServiceType.findByIdAndDelete(serviceTypeId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Service type has been deleted successfully."));
});
exports.deleteServiceType = deleteServiceType;
const updateServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceTypeId, serviceTypeCode, serviceTypeDescription } = req.body;
    if ([serviceTypeId, serviceTypeCode, serviceTypeDescription].some((field) => field?.trim() === "")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if ([serviceTypeId, serviceTypeCode, serviceTypeDescription].some((field) => typeof field !== "string")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid data provided");
    }
    const updatedServiceType = await serviceType_model_1.ServiceType.findByIdAndUpdate(serviceTypeId, {
        $set: {
            serviceTypeCode,
            serviceTypeDescription
        }
    }, {
        new: true
    });
    if (!updatedServiceType) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the service type");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedServiceType, "Service type has been updated"));
});
exports.updateServiceType = updateServiceType;
const getAllServiceTypes = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allServiceTypes = await serviceType_model_1.ServiceType.find({});
    if (!allServiceTypes) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service types");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allServiceTypes, "Fetched all service types successfully"));
});
exports.getAllServiceTypes = getAllServiceTypes;
const searchServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await serviceType_model_1.ServiceType.find({
        $or: [
            { serviceTypeCode: {
                    $regex: searchQuery
                } },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Service Type found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchServiceType = searchServiceType;

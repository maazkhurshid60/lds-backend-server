"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStandardServiceType = exports.getAllStandardServiceType = exports.deleteStandardServiceType = exports.updateStandardServiceType = exports.createNewStandardServiceType = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const standardServiceType_model_1 = require("../models/standardServiceType.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewStandardServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, isActive } = req.body;
    if (!name || name?.trim() === "") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Name is required");
    }
    const alreadyExistedName = await standardServiceType_model_1.StandardServiceType.findOne({ name });
    if (alreadyExistedName) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, `This standard service type already exists`);
    }
    const newStandardServiceType = await standardServiceType_model_1.StandardServiceType.create({
        name,
        isActive
    });
    if (!newStandardServiceType) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new standard service type");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newStandardServiceType, "New standard service type has been created"));
});
exports.createNewStandardServiceType = createNewStandardServiceType;
const updateStandardServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { standardServiceTypeId, name } = req.body;
    if (!standardServiceTypeId || !name) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if ([standardServiceTypeId, name].some((field) => field?.trim() === "")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    const updatedStandardServiceType = await standardServiceType_model_1.StandardServiceType.findByIdAndUpdate(standardServiceTypeId, {
        $set: {
            name
        }
    }, {
        new: true,
    });
    if (!updatedStandardServiceType) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating standard service type");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedStandardServiceType, "Standard service type has been created"));
});
exports.updateStandardServiceType = updateStandardServiceType;
const deleteStandardServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { standardServiceTypeId } = req.body;
    if (!standardServiceTypeId || standardServiceTypeId.trim() === "") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Standard service type id is required");
    }
    await standardServiceType_model_1.StandardServiceType.findByIdAndDelete(standardServiceTypeId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Standard service type has been deleted"));
});
exports.deleteStandardServiceType = deleteStandardServiceType;
const getAllStandardServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allStandardServiceTypes = await standardServiceType_model_1.StandardServiceType.find({});
    if (!allStandardServiceTypes) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all standard service types");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allStandardServiceTypes, "All standard service types fetched successfully."));
});
exports.getAllStandardServiceType = getAllStandardServiceType;
const searchStandardServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await standardServiceType_model_1.StandardServiceType.find({
        $or: [
            { name: {
                    $regex: searchQuery
                } },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Standard Service Type found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchStandardServiceType = searchStandardServiceType;

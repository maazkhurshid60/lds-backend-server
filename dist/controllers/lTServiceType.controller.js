"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLTSerivceType = exports.getAllLTServiceType = exports.deleteLTServiceType = exports.updateLTServiceType = exports.createNewLTServiceType = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const lTServiceType_model_1 = require("../models/lTServiceType.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewLTServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, isActive } = req.body;
    if (!name || name?.trim() === "") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Name is required");
    }
    if (isActive === undefined || typeof isActive !== "boolean" || typeof name !== "string") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid data types");
    }
    const nameAlreadyExists = await lTServiceType_model_1.LTServiceType.findOne({
        name
    });
    if (nameAlreadyExists) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, `The name ${name} already exists`);
    }
    const newLTServiceType = await lTServiceType_model_1.LTServiceType.create({
        name,
        isActive
    });
    if (!newLTServiceType) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new L&T Service Type");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newLTServiceType, "New L&T Service Type is created"));
});
exports.createNewLTServiceType = createNewLTServiceType;
const updateLTServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { lTServiceTypeId, name, isActive } = req.body;
    if (!lTServiceTypeId || !name || isActive === undefined) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Missing required fields.");
    }
    if ([lTServiceTypeId, name].some((field) => field?.trim() === "")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required.");
    }
    const updatedLTServiceType = await lTServiceType_model_1.LTServiceType.findByIdAndUpdate(lTServiceTypeId, {
        $set: {
            name,
            isActive
        }
    }, {
        new: true
    });
    if (!updatedLTServiceType) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the L&T Service Type");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedLTServiceType, "L&T Service Type has been updated"));
});
exports.updateLTServiceType = updateLTServiceType;
const deleteLTServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { lTServiceTypeId } = req.body;
    if (!lTServiceTypeId || lTServiceTypeId?.trim() === "") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "L&T Service Type Id is required");
    }
    await lTServiceType_model_1.LTServiceType.findByIdAndDelete(lTServiceTypeId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "L&T Service Type has been deleted"));
});
exports.deleteLTServiceType = deleteLTServiceType;
const getAllLTServiceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allLTServiceTypes = await lTServiceType_model_1.LTServiceType.find({});
    if (!allLTServiceTypes) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all the L&T Service Types");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allLTServiceTypes, "All L&T Service Types fetched successfully."));
});
exports.getAllLTServiceType = getAllLTServiceType;
const searchLTSerivceType = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await lTServiceType_model_1.LTServiceType.find({
        $or: [
            { name: {
                    $regex: searchQuery
                } },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No LT Service Type found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchLTSerivceType = searchLTSerivceType;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSetting = exports.getAllSettings = exports.updateSettings = exports.createNewSetting = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const setting_model_1 = require("../models/setting.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewSetting = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { label, value } = req.body;
    // if(!label) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Label is required.");
    // }
    // if(typeof value !== "boolean" && !value) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Value is required.");
    // }
    // if(value === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Value is required.");
    // }
    const newSetting = await setting_model_1.Setting.create({
        label,
        value
    });
    if (!newSetting) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new setting");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newSetting, "New setting created successfully."));
});
exports.createNewSetting = createNewSetting;
const updateSettings = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { settings } = req.body;
    if (settings.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Settings are required.");
    }
    await setting_model_1.Setting.deleteMany({});
    for (let i = 0; i < settings.length; i++) {
        const set = settings[i];
        await setting_model_1.Setting.create(set);
    }
    const newSettings = await setting_model_1.Setting.find({});
    if (!newSettings) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all settings");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, newSettings, "All settings fetched successfully."));
});
exports.updateSettings = updateSettings;
const getAllSettings = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allSettings = await setting_model_1.Setting.find({});
    if (!allSettings) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Something went wrong while fetching all the settings.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allSettings, "All settings fetched successfully."));
});
exports.getAllSettings = getAllSettings;
const searchSetting = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await setting_model_1.Setting.find({
        $or: [
            {
                label: {
                    $regex: searchQuery
                }
            },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Setting found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchSetting = searchSetting;

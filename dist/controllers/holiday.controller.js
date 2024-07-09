"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHoliday = exports.getAllHolidays = exports.deleteHoliday = exports.updateHoliday = exports.createNewHoliday = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const holidays_model_1 = require("../models/holidays.model");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewHoliday = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { holidayYear, holidayDate, holidayDescription } = req.body;
    if (!holidayYear) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if ([holidayDate, holidayDescription].some((field) => field?.trim() === "")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    const newCreatedHoliday = await holidays_model_1.Holiday.create({
        holidayYear,
        holidayDate,
        holidayDescription
    });
    if (!newCreatedHoliday) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new Holiday");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newCreatedHoliday, "New holiday created successfully."));
});
exports.createNewHoliday = createNewHoliday;
const updateHoliday = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { holidayId, holidayYear, holidayDate, holidayDescription } = req.body;
    if (!holidayId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Holiday Id is required");
    }
    if (!holidayYear) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    if ([holidayDate, holidayDescription].some((field) => field?.trim() === "")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "All fields are required");
    }
    const updatedHoliday = await holidays_model_1.Holiday.findByIdAndUpdate(holidayId, {
        $set: {
            holidayYear,
            holidayDate,
            holidayDescription
        }
    }, {
        new: true
    });
    if (!updatedHoliday) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the holiday");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedHoliday, "Holiday updated successfully"));
});
exports.updateHoliday = updateHoliday;
const deleteHoliday = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { holidayId } = req.body;
    if (!holidayId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Holiday Id is required");
    }
    await holidays_model_1.Holiday.findByIdAndDelete(holidayId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Holiday deleted successfully."));
});
exports.deleteHoliday = deleteHoliday;
const getAllHolidays = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allHolidays = await holidays_model_1.Holiday.find({});
    if (!allHolidays) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all holidays");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allHolidays, "All Holidays fetched successfully."));
});
exports.getAllHolidays = getAllHolidays;
const searchHoliday = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await holidays_model_1.Holiday.find({
        $or: [
            { holidayYear: {
                    $regex: searchQuery
                } },
            { holidayDate: {
                    $regex: searchQuery
                } }
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Holiday found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchHoliday = searchHoliday;

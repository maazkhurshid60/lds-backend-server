"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMailingAddress = exports.getAllMailingAddress = exports.deleteMailingAddress = exports.updateMailingAddress = exports.createNewMailingAddress = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const mailingAddress_model_1 = require("../models/mailingAddress.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewMailingAddress = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { firstName, address, apt, city, state, zip
    // , rRR
     } = req.body;
    // if(
    //     [firstName, address, apt, city, state].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    // if(!zip || rRR === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    const newMailingAddress = await mailingAddress_model_1.MailingAddress.create({
        firstName,
        address,
        apt,
        city,
        state,
        zip,
        // rRR
    });
    if (!newMailingAddress) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new mailing address.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newMailingAddress, "New mailing address created successfully."));
});
exports.createNewMailingAddress = createNewMailingAddress;
const updateMailingAddress = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { mailingAddressId, firstName, address, apt, city, state, zip
    // , rRR
     } = req.body;
    // if (
    //     [mailingAddressId, firstName, address, apt, city, state].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    // if (!zip || rRR === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    const updatedMailingAddress = await mailingAddress_model_1.MailingAddress.findByIdAndUpdate(mailingAddressId, {
        $set: {
            firstName, address, apt, city, state, zip
            //, rRR
        }
    }, {
        new: true
    });
    if (!updatedMailingAddress) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating mailing address.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedMailingAddress, "Mailing address updated successfully."));
});
exports.updateMailingAddress = updateMailingAddress;
const deleteMailingAddress = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { mailingAddressId } = req.body;
    if (!mailingAddressId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Mailing address id is required");
    }
    await mailingAddress_model_1.MailingAddress.findByIdAndDelete(mailingAddressId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Mailing address deleted successfully."));
});
exports.deleteMailingAddress = deleteMailingAddress;
const getAllMailingAddress = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allMailingAddress = await mailingAddress_model_1.MailingAddress.find({});
    if (!allMailingAddress) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all mailing address");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allMailingAddress, "All mailing addresses fetched successfully."));
});
exports.getAllMailingAddress = getAllMailingAddress;
const searchMailingAddress = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await mailingAddress_model_1.MailingAddress.find({
        $or: [
            {
                firstName: {
                    $regex: searchQuery
                }
            },
            {
                address: {
                    $regex: searchQuery
                }
            },
            {
                city: {
                    $regex: searchQuery
                }
            },
            {
                state: {
                    $regex: searchQuery
                }
            },
            {
                zip: {
                    $regex: searchQuery
                }
            },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Mailing address found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchMailingAddress = searchMailingAddress;

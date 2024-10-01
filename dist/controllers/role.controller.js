"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRole = exports.getAllAvailableRoles = exports.deleteRole = exports.updateRole = exports.createRole = void 0;
const role_model_1 = require("../models/role.model");
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = require("../utils/ApiResponse");
const createRole = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { name, description, isActive } = req.body;
    // if(
    //     [name, description].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Name and Description are required fields");
    // }
    // if(typeof isActive !== "boolean") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid isActive type");
    // }
    const createdRole = await role_model_1.Role.create({
        name,
        description,
        isActive
    });
    if (!createRole) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new role.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, createdRole, "New role has been created"));
});
exports.createRole = createRole;
const updateRole = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { roleId, name, description, isActive } = req.body;
    // if (
    //     [roleId, name, description].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Name and Description are required fields");
    // }
    // if (typeof isActive !== "boolean") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid isActive type");
    // }
    const updatedRole = await role_model_1.Role.findByIdAndUpdate(roleId, {
        $set: {
            name,
            description,
            isActive
        }
    }, {
        new: true,
    });
    if (!updatedRole) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new role");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedRole, "Role has been updated"));
});
exports.updateRole = updateRole;
const deleteRole = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { roleId } = req.body;
    if (!roleId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Role id is required");
    }
    await role_model_1.Role.findByIdAndDelete(roleId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Role has been deleted successfully"));
});
exports.deleteRole = deleteRole;
const getAllAvailableRoles = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allAvailableRoles = await role_model_1.Role.find({});
    if (!allAvailableRoles) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all roles");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allAvailableRoles, "Fetched all roles successfully!"));
});
exports.getAllAvailableRoles = getAllAvailableRoles;
const searchRole = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await role_model_1.Role.find({
        $or: [
            {
                name: {
                    $regex: searchQuery
                }
            },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Role found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchRole = searchRole;

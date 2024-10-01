"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUser = exports.getAllCreatedUsers = exports.updateUserRoles = exports.getAnyUserDetails = exports.getCurrentUser = exports.deleteUser = exports.updateUserDetails = exports.logoutUser = exports.loginUser = exports.registerNewUser = exports.healthCheck = void 0;
const user_model_1 = require("../models/user.model");
const role_model_1 = require("../models/role.model");
const AsyncHandler_1 = require("../utils/AsyncHandler");
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = require("../utils/ApiResponse");
const ApiError_1 = require("../utils/ApiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Hashing_1 = require("../utils/Hashing");
const generateAccessTokens = async (userId) => {
    try {
        const user = await user_model_1.User.findById(userId);
        const userAccessToken = (0, Hashing_1.generateAccessToken)(user);
        return userAccessToken;
    }
    catch (error) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while generating access token.");
    }
};
const healthCheck = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, {}, "Everthing is working fine !!!!"));
});
exports.healthCheck = healthCheck;
const registerNewUser = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { userName, firstName, lastName, email, password, roles } = req.body;
    // if (
    //     [userName, email, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // };
    // if (roles.length === 0) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Roles are empty");
    // }
    if (!roles.every((role) => typeof role === "string")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Roles Type");
    }
    const existingUserWithEmail = await user_model_1.User.findOne({
        $or: [{ email }, { userName }]
    });
    console.log("Existing User: ", existingUserWithEmail?.userName);
    if (existingUserWithEmail) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, "User with email or username already exists");
    }
    const rolesList = [];
    for (let i = 0; i < roles.length; i++) {
        const roleName = roles[i];
        const roleInDb = await role_model_1.Role.findOne({
            name: roleName
        });
        if (roleInDb) {
            rolesList.push(roleInDb._id);
        }
    }
    if (rolesList.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, "Invalid Roles Assign");
    }
    //Hashing user password
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await user_model_1.User.create({
        userName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roles: rolesList,
    });
    const createdUser = await user_model_1.User.findById(user._id).select("-password -refreshToken").populate(["roles"]);
    if (!createdUser) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating the user");
    }
    res.status(http_status_codes_1.StatusCodes.CREATED).json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, createdUser, "User Registered Successfully!"));
});
exports.registerNewUser = registerNewUser;
const loginUser = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { userName, password } = req.body;
    if ([userName, password].some((field) => field?.trim() === "")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Username and Password are required");
    }
    ;
    const user = await user_model_1.User.findOne({ userName: userName });
    if (!user) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "User does not exists.");
    }
    if (!user.isActive) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is deactivated");
    }
    const isPasswordvalid = await (0, Hashing_1.checkIsUserPasswordCorrect)(user.password, password);
    if (!isPasswordvalid) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user credentials.");
    }
    const accessToken = await generateAccessTokens(user._id);
    const loggedInUser = await user_model_1.User.findById(user._id).select("-password").populate(["roles"]);
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, { user: loggedInUser, accessToken }, "User logged in successfully."));
});
exports.loginUser = loginUser;
const logoutUser = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const isUserExists = await user_model_1.User.findById(user._id);
    if (!isUserExists) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized Action");
    }
    const options = {
        httpOnly: true,
        secure: true
    };
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .clearCookie("accessToken", options)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "User logout successfully"));
});
exports.logoutUser = logoutUser;
const updateUserDetails = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId, userName, firstName, lastName, email } = req.body;
    // if(
    //     [userId, userName,  email].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    const updatedUser = await user_model_1.User.findByIdAndUpdate(userId, {
        $set: {
            ...req.body
        }
    }, { new: true }).select("-password").populate(["roles"]);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedUser, "User updated successfully"));
});
exports.updateUserDetails = updateUserDetails;
const deleteUser = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "UserId is required");
    }
    await user_model_1.User.findByIdAndDelete(userId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "User has been deleted successfully."));
});
exports.deleteUser = deleteUser;
const getCurrentUser = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const isUserExists = await user_model_1.User.findById(user._id).select("-password").populate(['roles']);
    if (!isUserExists) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthenticated Action");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, isUserExists, "Get current user successfully."));
});
exports.getCurrentUser = getCurrentUser;
const getAnyUserDetails = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "UserId is required");
    }
    const user = await user_model_1.User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "User does not exists");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, user, `Get user Id: ${userId} details successfully.`));
});
exports.getAnyUserDetails = getAnyUserDetails;
const updateUserRoles = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId, roles } = req.body;
    if (!userId || userId?.trim() === "") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "UserId is required");
    }
    if (!roles || roles?.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Roles are required");
    }
    if (!roles.every((role) => typeof role === "string")) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Roles Type");
    }
    const rolesList = [];
    for (let i = 0; i < roles.length; i++) {
        const roleName = roles[i];
        const roleInDb = await role_model_1.Role.findOne({
            name: roleName
        });
        if (roleInDb) {
            rolesList.push(roleInDb._id);
        }
    }
    if (rolesList.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, "Invalid Roles Assign");
    }
    const updatedUser = await user_model_1.User.findByIdAndUpdate(userId, {
        $set: {
            roles: rolesList
        },
    }, {
        new: true
    }).select("-password").populate(["roles"]);
    if (!updatedUser) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Something went wrong while updating roles.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedUser, `User id : ${userId} roles has been updated successfully.`));
});
exports.updateUserRoles = updateUserRoles;
const getAllCreatedUsers = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const allUsers = await user_model_1.User.find({}).select('-password').populate(['roles']);
    if (!allUsers) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all users.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allUsers, "Fetched all users successfully!"));
});
exports.getAllCreatedUsers = getAllCreatedUsers;
const searchUser = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await user_model_1.User.find({
        $or: [
            {
                userName: {
                    $regex: searchQuery
                }
            },
            {
                firstName: {
                    $regex: searchQuery
                }
            },
            {
                lastName: {
                    $regex: searchQuery
                }
            },
            {
                email: {
                    $regex: searchQuery
                }
            },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No User found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchUser = searchUser;

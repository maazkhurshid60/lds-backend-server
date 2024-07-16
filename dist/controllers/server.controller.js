"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchServer = exports.getAllServers = exports.deleteServer = exports.updateServer = exports.createNewServer = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const server_model_1 = require("../models/server.model");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewServer = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serverCode, firstName, lastName, deviceCode, licenseNo, address1, address2, country, state, zip, phone, fax, apt, isActive } = req.body;
    const isServerCodeAlreadyExists = await server_model_1.Server.findOne({
        serverCode
    });
    if (isServerCodeAlreadyExists) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, "This Server code already exists.");
    }
    const createdServer = await server_model_1.Server.create({
        serverCode,
        firstName,
        lastName,
        deviceCode,
        licenseNo,
        address1,
        address2,
        country,
        state,
        zip,
        phone,
        fax,
        apt,
        isActive
    });
    if (!createdServer) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new server.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, createdServer, "New server is successfully created."));
});
exports.createNewServer = createNewServer;
const updateServer = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serverId, serverCode, firstName, lastName, deviceCode, licenseNo, address1, address2, country, state, zip, phone, fax, apt, isActive } = req.body;
    if (!serverId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Server id is required");
    }
    const updatedServer = await server_model_1.Server.findByIdAndUpdate(serverId, {
        $set: {
            serverCode,
            firstName,
            lastName,
            deviceCode,
            licenseNo,
            address1,
            address2,
            country,
            state,
            zip,
            phone,
            fax,
            apt,
            isActive
        }
    }, {
        new: true
    });
    if (!updatedServer) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the server.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedServer, "Server has been updated successfully."));
});
exports.updateServer = updateServer;
const deleteServer = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serverId } = req.body;
    if (!serverId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Server id is required");
    }
    await server_model_1.Server.findByIdAndDelete(serverId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Server has been deleted successfully"));
});
exports.deleteServer = deleteServer;
const getAllServers = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    // const { noOfDocsEachPage, currentPageNumber } : IPagination = req.body
    // if(noOfDocsEachPage === undefined || currentPageNumber === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Pagination variables are missing.");
    // }
    // if(typeof noOfDocsEachPage !== "number" || typeof currentPageNumber !== "number") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data provided."); 
    // }
    // const totalServers: number = await Server.find({}).countDocuments() as number;
    const totalServers = await server_model_1.Server.find({});
    // const allServers: IServerDocument[] = await Server.find({})
    // .skip(noOfDocsEachPage * (currentPageNumber === 1 ? 0 : currentPageNumber))
    // .limit(noOfDocsEachPage) as IServerDocument[];
    // const data : {
    //     totalNoOfDocuments : number,
    //     servers: IServerDocument[] 
    // } = {
    //     "totalNoOfDocuments" : totalServers,
    //     "servers" : allServers
    // };
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, totalServers, "Fetched all servers successfully."));
});
exports.getAllServers = getAllServers;
const searchServer = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await server_model_1.Server.find({
        $or: [
            { serverCode: {
                    $regex: searchQuery.toUpperCase()
                } },
            { firstName: {
                    $regex: searchQuery
                } },
            { lastName: {
                    $regex: searchQuery
                } },
            { deviceCode: {
                    $regex: searchQuery.toUpperCase()
                } },
            { licenseNo: {
                    $regex: searchQuery
                } },
            { country: {
                    $regex: searchQuery
                } },
            { state: {
                    $regex: searchQuery
                } },
            { zip: {
                    $regex: searchQuery
                } },
            { phone: {
                    $regex: searchQuery
                } },
            { fax: {
                    $regex: searchQuery
                } },
            { apt: {
                    $regex: searchQuery
                } },
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Server found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchServer = searchServer;

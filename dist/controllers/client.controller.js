"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClient = exports.getAllClients = exports.deleteClient = exports.updateClient = exports.createNewClient = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const client_model_1 = require("../models/client.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewClient = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { code, fullName, mi, address1, address2, city, state, zip, phone, fax, apt, isActive, } = req.body;
    // if (
    //     [
    //         code,
    //         fullName,
    //         address1,
    //         city,
    //         state,
    //         phone,
    //     ].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    // if (!zip || isActive === undefined || typeof isActive !== "boolean") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    const newCreatedClient = await client_model_1.Client.create({
        code,
        fullName,
        mi,
        address1,
        address2,
        city,
        state,
        zip,
        phone,
        fax,
        apt,
        isActive,
    });
    if (!newCreatedClient) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new client");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newCreatedClient, "New client has been created."));
});
exports.createNewClient = createNewClient;
const updateClient = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { clientId, code, fullName, mi, address1, address2, city, state, zip, phone, fax, apt, isActive, } = req.body;
    // if (
    //     [
    //         clientId,
    //         code,
    //         fullName,
    //         address1,
    //         city,
    //         state,
    //         phone,
    //         apt,
    //     ].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    // if (!zip || isActive === undefined || typeof isActive !== "boolean") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    const updatedClient = await client_model_1.Client.findByIdAndUpdate(clientId, {
        $set: {
            code,
            fullName,
            mi,
            address1,
            address2,
            city,
            state,
            zip,
            phone,
            fax,
            apt,
            isActive,
        }
    }, {
        new: true,
    });
    if (!updatedClient) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating Client");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedClient, "Client has been updated"));
});
exports.updateClient = updateClient;
const deleteClient = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { clientId } = req.body;
    if (!clientId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Client id is required.");
    }
    await client_model_1.Client.findByIdAndDelete(clientId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Client has been deleted"));
});
exports.deleteClient = deleteClient;
const getAllClients = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    // const { currentPageNumber, noOfDocsEachPage } : IPagination = req.body;
    // if(noOfDocsEachPage === undefined || currentPageNumber === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Pagination variables are missing.");
    // }
    // if(typeof noOfDocsEachPage !== "number" || typeof currentPageNumber !== "number") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data provided."); 
    // }
    // const totalClients: number = await Client.find({}).countDocuments() as number;
    const totalClients = await client_model_1.Client.find({});
    // const allClients: IClientDocument[] = await Client.find({})
    // .skip(noOfDocsEachPage * (currentPageNumber === 1 ? 0 : currentPageNumber))
    // .limit(noOfDocsEachPage) as IClientDocument[];
    // const data : {
    //     totalNoOfDocuments : number,
    //     clients: IClientDocument[] 
    // } = {
    //     "totalNoOfDocuments" : totalClients,
    //     "clients" : allClients
    // };
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, totalClients, "Fetched all clients successfully."));
});
exports.getAllClients = getAllClients;
const searchClient = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await client_model_1.Client.find({
        $or: [
            {
                code: {
                    $regex: searchQuery.toUpperCase()
                }
            }
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No clients found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchClient = searchClient;

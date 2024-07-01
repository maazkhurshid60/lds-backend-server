import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateServer, IUpdateServer } from "../interfaces/server.interface";
import { IServerDocument, Server } from "../models/server.model";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";
import { IPagination } from "../interfaces/pagination.interface";


const createNewServer = asyncHandler( async (req: Request, res: Response) => {

    const {
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
    } : ICreateServer = req.body;


    const isServerCodeAlreadyExists: IServerDocument = await Server.findOne({
        serverCode
    }) as IServerDocument;

    if(isServerCodeAlreadyExists) {
        throw new ApiError(StatusCodes.CONFLICT, "This Server code already exists.");
    }

    const createdServer: IServerDocument = await Server.create(
        {
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
    ) as IServerDocument;

    if(!createdServer) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new server.");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, createdServer, "New server is successfully created.")
    );

});


const updateServer = asyncHandler( async (req: Request, res: Response) => {

    const {
        serverId,
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
    } : IUpdateServer = req.body;

    if(!serverId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Server id is required");
    }

    const updatedServer: IServerDocument = await Server.findByIdAndUpdate(
        serverId,
        {
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
        },
        {
            new: true
        }
    ) as IServerDocument;

    if(!updatedServer) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the server.");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedServer, "Server has been updated successfully.")
    );

});

const deleteServer = asyncHandler( async (req: Request, res: Response) => {

    const { serverId } : { serverId: string } = req.body;

    if(!serverId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Server id is required");
    }

    await Server.findByIdAndDelete(
        serverId
    );

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "Server has been deleted successfully")
    );

});

const getAllServers = asyncHandler( async(req: Request, res: Response) => {

    const { noOfDocsEachPage, currentPageNumber } : IPagination = req.body
    
    if(noOfDocsEachPage === undefined || currentPageNumber === undefined) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Pagination variables are missing.");
    }

    if(typeof noOfDocsEachPage !== "number" || typeof currentPageNumber !== "number") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data provided."); 
    }

    const totalServers: number = await Server.find({}).countDocuments() as number;

    const allServers: IServerDocument[] = await Server.find({})
    .skip(noOfDocsEachPage * (currentPageNumber === 1 ? 0 : currentPageNumber))
    .limit(noOfDocsEachPage) as IServerDocument[];

    const data : {
        totalNoOfDocuments : number,
        servers: IServerDocument[] 
    } = {
        "totalNoOfDocuments" : totalServers,
        "servers" : allServers
    };


    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, data, "Fetched all servers successfully.")
    );
    
});

const searchServer = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IServerDocument[] = await Server.find(
        {
            $or: [
                {serverCode: {
                    $regex: searchQuery.toUpperCase()
                }},
                {firstName: {
                    $regex: searchQuery
                }},
                {lastName: {
                    $regex: searchQuery
                }},
                {deviceCode: {
                    $regex: searchQuery.toUpperCase()
                }},
                {licenseNo: {
                    $regex: searchQuery
                }},
                {country: {
                    $regex: searchQuery
                }},
                {state: {
                    $regex: searchQuery
                }},
                {zip: {
                    $regex: searchQuery
                }},
                {phone: {
                    $regex: searchQuery
                }},
                {fax: {
                    $regex: searchQuery
                }},
                {apt: {
                    $regex: searchQuery
                }},

            ]
        }
    ) as IServerDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Server found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});


export {
    createNewServer,
    updateServer,
    deleteServer,
    getAllServers,
    searchServer
}
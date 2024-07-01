import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateClient, IUpdateClient } from "../interfaces/client.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { Client, IClientDocument } from "../models/client.model";
import { ApiResponse } from "../utils/ApiResponse";
import { IPagination } from "../interfaces/pagination.interface";

const createNewClient = asyncHandler( async (req: Request, res: Response) => {

    const { 
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
     } : ICreateClient = req.body;

     if(
        [
            code,
            fullName,
            address1,
            city,
            state,
            phone,
            apt,    
        ].some((field: string) => field?.trim() === "")
     ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
     }

     if(!zip || isActive === undefined || typeof isActive !== "boolean") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
     }

     const newCreatedClient: IClientDocument = await Client.create({
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
     }) as IClientDocument;

     if(!newCreatedClient) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new client");
     }

     return res
     .status(StatusCodes.CREATED)
     .json(
        new ApiResponse(StatusCodes.CREATED, newCreatedClient, "New client has been created.")
     );
    
});

const updateClient = asyncHandler( async (req: Request, res: Response) => {

    const { 
        clientId,
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
     } : IUpdateClient = req.body;

     if(
        [
            clientId,
            code,
            fullName,
            address1,
            city,
            state,
            phone,
            apt,    
        ].some((field: string) => field?.trim() === "")
     ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
     }

     if(!zip || isActive === undefined || typeof isActive !== "boolean") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
     }

     const updatedClient: IClientDocument = await Client.findByIdAndUpdate(
        clientId,
        {
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
        },
        {
            new: true,
        }
     ) as IClientDocument;

     if(!updatedClient) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating Client");
     }

     return res
     .status(StatusCodes.OK)
     .json(
        new ApiResponse(StatusCodes.OK, updatedClient, "Client has been updated")
     );

});

const deleteClient = asyncHandler( async (req: Request, res: Response) => {

    const { clientId } : { clientId: string } = req.body;

    if(!clientId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Client id is required.");
    }

    await Client.findByIdAndDelete( clientId );

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "Client has been deleted")
    );

});

const getAllClients = asyncHandler( async (req: Request, res: Response) => {

    const { currentPageNumber, noOfDocsEachPage } : IPagination = req.body;

    if(noOfDocsEachPage === undefined || currentPageNumber === undefined) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Pagination variables are missing.");
    }

    if(typeof noOfDocsEachPage !== "number" || typeof currentPageNumber !== "number") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data provided."); 
    }

    const totalClients: number = await Client.find({}).countDocuments() as number;

    const allClients: IClientDocument[] = await Client.find({})
    .skip(noOfDocsEachPage * (currentPageNumber === 1 ? 0 : currentPageNumber))
    .limit(noOfDocsEachPage) as IClientDocument[];

    const data : {
        totalNoOfDocuments : number,
        clients: IClientDocument[] 
    } = {
        "totalNoOfDocuments" : totalClients,
        "clients" : allClients
    };

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, data, "Fetched all clients successfully.")
    );

});


const searchClient = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IClientDocument[] = await Client.find(
        {
            $or: [
                {code: {
                    $regex: searchQuery.toUpperCase()
                }}
            ]
        }
    ) as IClientDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No clients found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});


export {
    createNewClient,
    updateClient,
    deleteClient,
    getAllClients,
    searchClient
}
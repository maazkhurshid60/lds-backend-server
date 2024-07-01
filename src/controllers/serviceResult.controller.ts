import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { IServiceResult, IUpdateServiceResult } from "../interfaces/serviceResult.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ServiceResult, IServiceResultDocument } from "../models/serviceResults.model";
import { ApiResponse } from "../utils/ApiResponse";

const createServiceResult = asyncHandler( async (req: Request, res: Response) => {

    const { serviceResultCode, serviceResultDescription }: IServiceResult = req.body;

    if(!serviceResultCode || !serviceResultDescription) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    if(typeof serviceResultCode !== "string" || typeof serviceResultDescription !== "string") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data types");
    }

    const newCreatedServiceResult: IServiceResultDocument = await ServiceResult.create({
        serviceResultCode,
        serviceResultDescription
    }) as IServiceResultDocument;

    if(!newCreatedServiceResult) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new service result.");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, newCreatedServiceResult, "New service result created successfully")
    );

});

const deleteServiceResult = asyncHandler( async (req: Request, res: Response) => {

    const { serviceResultId } : { serviceResultId: string } = req.body;
    
    if(!serviceResultId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service result id is required");
    }

    await ServiceResult.findByIdAndDelete(serviceResultId);

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {} , "Service Result has been deleted successfully.")
    );

});

const updateServiceResult = asyncHandler( async (req: Request, res: Response) => {

    const { serviceResultId, serviceResultCode, serviceResultDescription } : IUpdateServiceResult = req.body;

    if(
        [serviceResultId, serviceResultCode, serviceResultDescription].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    if(
        [serviceResultId, serviceResultCode, serviceResultDescription].some((field) => typeof field !== "string")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "invalid data provided");
    }

    const updatedServiceResult: IServiceResultDocument = await ServiceResult.findByIdAndUpdate(
        serviceResultId,
        {
            $set: {
                serviceResultCode,
                serviceResultDescription
            }
        },
        {
            new: true
        }
    ) as IServiceResultDocument;

    if(!updatedServiceResult) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the service result");
    }
    
    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedServiceResult, "Service result has been updated")
    );

});


const getAllServiceResults = asyncHandler( async (req: Request, res: Response) => {

    const allServiceResults: IServiceResultDocument[] = await ServiceResult.find({}) as IServiceResultDocument[];

    if(!allServiceResults) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service results");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, allServiceResults, "Fetched all service results successfully")
    );

});

const searchServiceResult = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IServiceResultDocument[] = await ServiceResult.find(
        {
            $or: [
                {serviceResultCode: {
                    $regex: searchQuery
                }},
            ]
        }
    ) as IServiceResultDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Service Result found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});


export {
    createServiceResult,
    deleteServiceResult,
    updateServiceResult,
    getAllServiceResults,
    searchServiceResult
}
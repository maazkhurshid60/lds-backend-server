import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { IServiceType, IUpdateServiceType } from "../interfaces/serviceType.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ServiceType, IServiceTypeDocument } from "../models/serviceType.model";
import { ApiResponse } from "../utils/ApiResponse";

const createServiceType = asyncHandler(async (req: Request, res: Response) => {

    const { serviceTypeCode, serviceTypeDescription }: IServiceType = req.body;

    // if(!serviceTypeCode || !serviceTypeDescription) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    // if(typeof serviceTypeCode !== "string" || typeof serviceTypeDescription !== "string") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data types");
    // }

    const newCreatedServiceType: IServiceTypeDocument = await ServiceType.create({
        serviceTypeCode,
        serviceTypeDescription
    }) as IServiceTypeDocument;

    if (!newCreatedServiceType) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new service type.");
    }

    return res
        .status(StatusCodes.CREATED)
        .json(
            new ApiResponse(StatusCodes.CREATED, newCreatedServiceType, "New service type created successfully")
        );

});

const deleteServiceType = asyncHandler(async (req: Request, res: Response) => {

    const { serviceTypeId }: { serviceTypeId: string } = req.body;

    if (!serviceTypeId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service type id is required");
    }

    await ServiceType.findByIdAndDelete(serviceTypeId);

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, {}, "Service type has been deleted successfully.")
        );

});

const updateServiceType = asyncHandler(async (req: Request, res: Response) => {

    const { serviceTypeId, serviceTypeCode, serviceTypeDescription }: IUpdateServiceType = req.body;

    // if (
    //     [serviceTypeId, serviceTypeCode, serviceTypeDescription].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    // if (
    //     [serviceTypeId, serviceTypeCode, serviceTypeDescription].some((field) => typeof field !== "string")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "invalid data provided");
    // }

    const updatedServiceType: IServiceTypeDocument = await ServiceType.findByIdAndUpdate(
        serviceTypeId,
        {
            $set: {
                serviceTypeCode,
                serviceTypeDescription
            }
        },
        {
            new: true
        }
    ) as IServiceTypeDocument;

    if (!updatedServiceType) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the service type");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, updatedServiceType, "Service type has been updated")
        );

});


const getAllServiceTypes = asyncHandler(async (req: Request, res: Response) => {

    const allServiceTypes: IServiceTypeDocument[] = await ServiceType.find({}) as IServiceTypeDocument[];

    if (!allServiceTypes) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service types");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, allServiceTypes, "Fetched all service types successfully")
        );

});

const searchServiceType = asyncHandler(async (req: Request, res: Response) => {

    const { searchQuery }: { searchQuery: string } = req.body;

    if (!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IServiceTypeDocument[] = await ServiceType.find(
        {
            $or: [
                {
                    serviceTypeCode: {
                        $regex: searchQuery
                    }
                },
            ]
        }
    ) as IServiceTypeDocument[];

    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Service Type found")
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
        );

});


export {
    createServiceType,
    updateServiceType,
    deleteServiceType,
    getAllServiceTypes,
    searchServiceType
}
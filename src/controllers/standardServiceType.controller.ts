import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateStandardServiceType, IUpdateStandardServiceType } from "../interfaces/standardServiceType.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { IStandardServiceDocument, StandardServiceType } from "../models/standardServiceType.model";
import { ApiResponse } from "../utils/ApiResponse";

const createNewStandardServiceType = asyncHandler( async (req: Request, res: Response) => {

    const { name,isActive }: ICreateStandardServiceType = req.body;

    if(!name || name?.trim() === "") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Name is required");
    }

    const alreadyExistedName: IStandardServiceDocument = await StandardServiceType.findOne({ name }) as IStandardServiceDocument;

    if(alreadyExistedName) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `This standard service type already exists`);
    }

    const newStandardServiceType: IStandardServiceDocument = await StandardServiceType.create({
        name,
        isActive
    }) as IStandardServiceDocument;

    if(!newStandardServiceType) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new standard service type");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, newStandardServiceType, "New standard service type has been created")
    );

});

const updateStandardServiceType = asyncHandler( async (req: Request, res: Response) => {

    const { standardServiceTypeId, name } : IUpdateStandardServiceType = req.body;

    if (!standardServiceTypeId || !name) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    if(
        [standardServiceTypeId, name].some((field: string) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    const updatedStandardServiceType: IStandardServiceDocument = await StandardServiceType.findByIdAndUpdate(
        standardServiceTypeId,
        {
            $set: {
                name
            }
        },
        {
            new: true,
        }
    ) as IStandardServiceDocument;

    if(!updatedStandardServiceType) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating standard service type");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedStandardServiceType, "Standard service type has been created")
    );

});

const deleteStandardServiceType = asyncHandler( async (req: Request, res: Response) => {

    const { standardServiceTypeId } : { standardServiceTypeId: string } = req.body;

    if(!standardServiceTypeId || standardServiceTypeId.trim() === "") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Standard service type id is required");
    }

    await StandardServiceType.findByIdAndDelete( standardServiceTypeId );

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "Standard service type has been deleted")
    );

});

const getAllStandardServiceType = asyncHandler( async (req: Request, res: Response) => {

    const allStandardServiceTypes: IStandardServiceDocument[] = await StandardServiceType.find({}) as IStandardServiceDocument[];

    if(!allStandardServiceTypes) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all standard service types");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, allStandardServiceTypes, "All standard service types fetched successfully.")
    );

});

const searchStandardServiceType = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IStandardServiceDocument[] = await StandardServiceType.find(
        {
            $or: [
                {name: {
                    $regex: searchQuery
                }},
            ]
        }
    ) as IStandardServiceDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Standard Service Type found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});

export {
    createNewStandardServiceType,
    updateStandardServiceType,
    deleteStandardServiceType,
    getAllStandardServiceType,
    searchStandardServiceType
}
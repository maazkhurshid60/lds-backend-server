import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateLTServiceType, IUpdateLTServiceType } from "../interfaces/lTServiceType.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ILTServiceTypeDocument, LTServiceType } from "../models/lTServiceType.model";
import { ApiResponse } from "../utils/ApiResponse";

const createNewLTServiceType = asyncHandler( async (req: Request, res: Response) => {

    const { name, isActive } : ICreateLTServiceType = req.body;

    if(!name || name?.trim() === "") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Name is required");
    }

    if(isActive === undefined || typeof isActive !== "boolean" || typeof name !== "string") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data types");
    }

    const nameAlreadyExists: ILTServiceTypeDocument = await LTServiceType.findOne({
        name
    }) as ILTServiceTypeDocument;

    if(nameAlreadyExists) {
        throw new ApiError(StatusCodes.CONFLICT, `The name ${name} already exists`);
    }

    const newLTServiceType: ILTServiceTypeDocument = await LTServiceType.create(
        {
            name,
            isActive
        }
    ) as ILTServiceTypeDocument;

    if(!newLTServiceType) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new L&T Service Type");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, newLTServiceType, "New L&T Service Type is created")
    );

});

const updateLTServiceType = asyncHandler( async (req: Request, res: Response) => {

    const { lTServiceTypeId, name, isActive } : IUpdateLTServiceType = req.body;

    if(!lTServiceTypeId || !name || isActive === undefined) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields.");
    }

    if(
        [lTServiceTypeId, name].some((field: string) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required.");
    }

    const updatedLTServiceType: ILTServiceTypeDocument = await LTServiceType.findByIdAndUpdate(
        lTServiceTypeId,
        {
            $set: {
                name,
                isActive
            }
        },
        {
            new: true
        }
    ) as ILTServiceTypeDocument;

    if(!updatedLTServiceType) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the L&T Service Type");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedLTServiceType, "L&T Service Type has been updated")
    );

});

const deleteLTServiceType = asyncHandler( async (req: Request, res: Response) => {

   const { lTServiceTypeId } : { lTServiceTypeId: string } = req.body;

    if(!lTServiceTypeId || lTServiceTypeId?.trim() === "") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "L&T Service Type Id is required");
    }

    await LTServiceType.findByIdAndDelete( lTServiceTypeId );

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "L&T Service Type has been deleted")
    );

});

const getAllLTServiceType = asyncHandler( async (req: Request, res: Response) => {

    const allLTServiceTypes: ILTServiceTypeDocument[] = await LTServiceType.find({}) as ILTServiceTypeDocument[];

    if(!allLTServiceTypes) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all the L&T Service Types");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, allLTServiceTypes, "All L&T Service Types fetched successfully.")
    );

});

const searchLTSerivceType = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: ILTServiceTypeDocument[] = await LTServiceType.find(
        {
            $or: [
                {name: {
                    $regex: searchQuery
                }},
            ]
        }
    ) as ILTServiceTypeDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No LT Service Type found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});

export {
    createNewLTServiceType,
    updateLTServiceType,
    deleteLTServiceType,
    getAllLTServiceType,
    searchLTSerivceType
}
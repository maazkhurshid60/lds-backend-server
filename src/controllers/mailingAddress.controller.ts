import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateMailingAddress, IUpdateMailingAddress } from "../interfaces/mailingAddress.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { IMailingAddressDocument, MailingAddress } from "../models/mailingAddress.model";
import { ApiResponse } from "../utils/ApiResponse";


const createNewMailingAddress = asyncHandler(async (req: Request, res: Response) => {

    const { firstName, address, apt, city, state, zip
        // , rRR

    }: ICreateMailingAddress = req.body;

    // if(
    //     [firstName, address, apt, city, state].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    // if(!zip || rRR === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    const newMailingAddress: IMailingAddressDocument = await MailingAddress.create({
        firstName,
        address,
        apt,
        city,
        state,
        zip,
        // rRR
    }) as IMailingAddressDocument;

    if (!newMailingAddress) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new mailing address.");
    }

    return res
        .status(StatusCodes.CREATED)
        .json(
            new ApiResponse(StatusCodes.CREATED, newMailingAddress, "New mailing address created successfully.")
        );

});

const updateMailingAddress = asyncHandler(async (req: Request, res: Response) => {

    const { mailingAddressId, firstName, address, apt, city, state, zip
        // , rRR

    }: IUpdateMailingAddress = req.body;

    // if (
    //     [mailingAddressId, firstName, address, apt, city, state].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    // if (!zip || rRR === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    const updatedMailingAddress: IMailingAddressDocument = await MailingAddress.findByIdAndUpdate(
        mailingAddressId,
        {
            $set: {
                firstName, address, apt, city, state, zip
                //, rRR
            }
        },
        {
            new: true
        }
    ) as IMailingAddressDocument;

    if (!updatedMailingAddress) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating mailing address.");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, updatedMailingAddress, "Mailing address updated successfully.")
        );

});

const deleteMailingAddress = asyncHandler(async (req: Request, res: Response) => {

    const { mailingAddressId }: { mailingAddressId: string } = req.body;

    if (!mailingAddressId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Mailing address id is required");
    }

    await MailingAddress.findByIdAndDelete(mailingAddressId);

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, {}, "Mailing address deleted successfully.")
        );

});

const getAllMailingAddress = asyncHandler(async (req: Request, res: Response) => {

    const allMailingAddress: IMailingAddressDocument[] = await MailingAddress.find({}) as IMailingAddressDocument[];

    if (!allMailingAddress) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all mailing address");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, allMailingAddress, "All mailing addresses fetched successfully.")
        );

});

const searchMailingAddress = asyncHandler(async (req: Request, res: Response) => {

    const { searchQuery }: { searchQuery: string } = req.body;

    if (!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IMailingAddressDocument[] = await MailingAddress.find(
        {
            $or: [
                {
                    firstName: {
                        $regex: searchQuery
                    }
                },
                {
                    address: {
                        $regex: searchQuery
                    }
                },
                {
                    city: {
                        $regex: searchQuery
                    }
                },
                {
                    state: {
                        $regex: searchQuery
                    }
                },
                {
                    zip: {
                        $regex: searchQuery
                    }
                },
            ]
        }
    ) as IMailingAddressDocument[];

    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Mailing address found")
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
        );

});

export {
    createNewMailingAddress,
    updateMailingAddress,
    deleteMailingAddress,
    getAllMailingAddress,
    searchMailingAddress
}
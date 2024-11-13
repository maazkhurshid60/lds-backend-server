import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/AsyncHandler";
import { serverDown } from "../models/serverDown.model";
import { Request, Response } from 'express';

interface SetServerRequestBody {
    serverDownStatus: boolean;  // Assuming the status is a boolean
    statusId?: string
}

export const setServerApi = asyncHandler(async (req: Request, res: Response) => {
    // Check and type-cast the request body
    const { serverDownStatus }: SetServerRequestBody = req.body as unknown as SetServerRequestBody;

    const setServerState = await serverDown.create({
        serverDownStatus
    });

    if (!setServerState) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while changing state of server.");
    }

    return res
        .status(StatusCodes.CREATED)
        .json(
            new ApiResponse(StatusCodes.CREATED, setServerState, "Server State has been changed")
        );
});


export const updateServerApi = asyncHandler(async (req: Request, res: Response) => {
    const { serverDownStatus, statusId }: SetServerRequestBody = req.body as unknown as SetServerRequestBody;

    // Check if serverDownStatus is provided and is a boolean
    if (typeof serverDownStatus !== 'boolean') {
        throw new ApiError(StatusCodes.BAD_REQUEST, "'serverDownStatus' must be a boolean.");
    }

    const updatedServerStatus: SetServerRequestBody = await serverDown.findByIdAndUpdate(
        statusId,
        {
            $set: {
                serverDownStatus
            }
        },
        {
            new: true,
        }
    ) as SetServerRequestBody;

    // If no server state was found, return an error
    if (!updatedServerStatus) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Some thing went Wrong");
    }

    // Return the updated server state as a response
    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, updateServerApi, "Server state has been successfully updated.")
        );
});



// Fetch all server states
export const getAllServerStateApi = asyncHandler(async (req: Request, res: Response) => {
    // Find all the server states in the collection
    const serverStates = await serverDown.find();

    // If no server states are found, return an error
    if (!serverStates || serverStates.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No server states found.");
    }

    // Return the list of server states
    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, serverStates, "All server states retrieved successfully.")
        );
});
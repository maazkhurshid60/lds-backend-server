import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateSetting, IUpdateSetting } from "../interfaces/setting.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ISettingDocument, Setting } from "../models/setting.model";
import { ApiResponse } from "../utils/ApiResponse";

const createNewSetting = asyncHandler( async (req: Request, res: Response) => {

    const { label, value } : ICreateSetting = req.body;

    if(!label) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Label is required.");
    }

    if(typeof value !== "boolean" && !value) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Value is required.");
    }

    if(value === undefined) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Value is required.");
    }

    const newSetting: ISettingDocument = await Setting.create({
        label,
        value
    }) as ISettingDocument;

    if(!newSetting) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new setting");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, newSetting, "New setting created successfully.")
    );

});

const updateSettings = asyncHandler( async (req: Request, res: Response) => {

    const { settings } : IUpdateSetting = req.body;

    if(settings.length === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Settings are required.");
    }

    await Setting.deleteMany({});

    for (let i = 0; i < settings.length; i++) {
        const set = settings[i];

        await Setting.create(set);
        
    } 

    const newSettings: ISettingDocument[] = await Setting.find({}) as ISettingDocument[];

    if(!newSettings) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all settings");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, newSettings, "All settings fetched successfully.")
    );

});

const getAllSettings = asyncHandler( async (req: Request, res: Response) => {

    const allSettings: ISettingDocument[] = await Setting.find({}) as ISettingDocument[];

    if(!allSettings) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Something went wrong while fetching all the settings.");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, allSettings, "All settings fetched successfully.")
    );

}); 

const searchSetting = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: ISettingDocument[] = await Setting.find(
        {
            $or: [
                {label: {
                    $regex: searchQuery
                }},
            ]
        }
    ) as ISettingDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Setting found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});

export {
    createNewSetting,
    updateSettings,
    getAllSettings,
    searchSetting
}
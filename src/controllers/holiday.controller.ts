import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { Holiday, IHolidayDocument } from "../models/holidays.model";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ICreateHoliday, IUpdateHoliday } from "../interfaces/holiday.interface";
import { ApiResponse } from "../utils/ApiResponse";


const createNewHoliday = asyncHandler(async (req: Request, res: Response) => {

    const { holidayYear, holidayDate, holidayDescription }: IHolidayDocument = req.body;

    // if(!holidayYear) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    // if(
    //     [holidayDate, holidayDescription].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    const newCreatedHoliday: ICreateHoliday = await Holiday.create({
        holidayYear,
        holidayDate,
        holidayDescription
    }) as IHolidayDocument;

    if (!newCreatedHoliday) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new Holiday");
    }

    return res
        .status(StatusCodes.CREATED)
        .json(
            new ApiResponse(StatusCodes.CREATED, newCreatedHoliday, "New holiday created successfully.")
        );

});

const updateHoliday = asyncHandler(async (req: Request, res: Response) => {

    const { holidayId, holidayYear, holidayDate, holidayDescription }: IUpdateHoliday = req.body;

    if (!holidayId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Holiday Id is required");
    }

    // if(!holidayYear) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    // if(
    //     [holidayDate, holidayDescription].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }

    const updatedHoliday: IHolidayDocument = await Holiday.findByIdAndUpdate(
        holidayId,
        {
            $set: {
                holidayYear,
                holidayDate,
                holidayDescription
            }
        },
        {
            new: true
        }
    ) as IHolidayDocument;

    if (!updatedHoliday) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the holiday");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, updatedHoliday, "Holiday updated successfully")
        );

});

const deleteHoliday = asyncHandler(async (req: Request, res: Response) => {

    const { holidayId }: { holidayId: string } = req.body;

    if (!holidayId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Holiday Id is required");
    }

    await Holiday.findByIdAndDelete(
        holidayId
    );

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, {}, "Holiday deleted successfully.")
        );

});

const getAllHolidays = asyncHandler(async (req: Request, res: Response) => {

    const allHolidays: IHolidayDocument[] = await Holiday.find({}) as IHolidayDocument[];

    if (!allHolidays) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all holidays");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, allHolidays, "All Holidays fetched successfully.")
        );

});

const searchHoliday = asyncHandler(async (req: Request, res: Response) => {

    const { searchQuery }: { searchQuery: string } = req.body;

    if (!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IHolidayDocument[] = await Holiday.find(
        {
            $or: [
                {
                    holidayYear: {
                        $regex: searchQuery
                    }
                },
                {
                    holidayDate: {
                        $regex: searchQuery
                    }
                }
            ]
        }
    ) as IHolidayDocument[];

    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Holiday found")
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
        );

});

export {
    createNewHoliday,
    updateHoliday,
    deleteHoliday,
    getAllHolidays,
    searchHoliday
}
import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateDevice, IUpdateDevice } from "../interfaces/device.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { Device, IDeviceDocument } from "../models/device.model";
import { ApiResponse } from "../utils/ApiResponse";
import { IPagination } from "../interfaces/pagination.interface";
import { v4 as uuidv4 } from "uuid";


const createNewDevice = asyncHandler( async (req: Request, res: Response) => {

    const { deviceCode, deviceName, productType, isActive } : ICreateDevice = req.body;

    if(
        [deviceCode, deviceName].some((field: string) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    if(isActive === undefined || typeof isActive !== "boolean") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    const deviceId = uuidv4();

    const newDevice: IDeviceDocument = await Device.create({
        deviceId,
        deviceCode,
        deviceName,
        productType,
        isActive
    }) as IDeviceDocument;

    if(!newDevice) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new device");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, newDevice, "New device created successfully")
    );

});


const updateDevice = asyncHandler( async (req: Request, res: Response) => {

    const { id, deviceId, deviceCode, deviceName, productType , isActive } : IUpdateDevice = req.body;

    if(
        [id, deviceId, deviceCode, deviceName].some((field: string) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    if(isActive === undefined || typeof isActive !== "boolean") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    const updatedDevice: IDeviceDocument = await Device.findByIdAndUpdate(
        id,
        {
            $set: {
                deviceId,
                deviceCode,
                deviceName,
                productType,
                isActive
            }
        },
        {
            new: true
        }
    ) as IDeviceDocument;

    if(!updatedDevice) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the device.");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedDevice, "Device updated successfully.")
    );

});

const deleteDevice = asyncHandler( async (req: Request, res: Response) => {

    const { id } : { id: string } = req.body;

    if(!id) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Device id is required.");
    }

    await Device.findByIdAndDelete(id);

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "Device has been deleted successfully.")
    );

});

const getAllDevices = asyncHandler( async (req: Request, res: Response) => {

    // const { noOfDocsEachPage, currentPageNumber } : IPagination = req.body;

    // if(noOfDocsEachPage === undefined || currentPageNumber === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Pagination variables are missing.");
    // }

    // if(typeof noOfDocsEachPage !== "number" || typeof currentPageNumber !== "number") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data provided."); 
    // }

    // const totalDevices: number = await Device.find({}).countDocuments() as number;

    const totalDevices: IDeviceDocument[] = await Device.find({}) as IDeviceDocument[];

    // const allDevices: IDeviceDocument[] = await Device.find({})
    // .skip(noOfDocsEachPage * (currentPageNumber === 1 ? 0 : currentPageNumber))
    // .limit(noOfDocsEachPage) as IDeviceDocument[];

    // const data : {
    //     totalNoOfDocuments : number,
    //     devices: IDeviceDocument[] 
    // } = {
    //     "totalNoOfDocuments" : totalDevices,
    //     "devices" : allDevices
    // };

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, totalDevices, "Fetched all devices successfully.")
    );

});

const searchDevice = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IDeviceDocument[] = await Device.find(
        {
            $or: [
                {deviceCode: {
                    $regex: searchQuery.toUpperCase()
                }},
                {deviceName: {
                    $regex: searchQuery
                }}
            ]
        }
    ) as IDeviceDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Devices found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});


export {
    createNewDevice,
    updateDevice,
    deleteDevice,
    getAllDevices,
    searchDevice
}
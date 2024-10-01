"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDevice = exports.getAllDevices = exports.deleteDevice = exports.updateDevice = exports.createNewDevice = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const device_model_1 = require("../models/device.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const uuid_1 = require("uuid");
const createNewDevice = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { deviceCode, deviceName, productType, isActive } = req.body;
    // if(
    //     [deviceCode, deviceName].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    // if(isActive === undefined || typeof isActive !== "boolean") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    const deviceId = (0, uuid_1.v4)();
    const newDevice = await device_model_1.Device.create({
        deviceId,
        deviceCode,
        deviceName,
        productType,
        isActive
    });
    if (!newDevice) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new device");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newDevice, "New device created successfully"));
});
exports.createNewDevice = createNewDevice;
const updateDevice = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { id, deviceId, deviceCode, deviceName, productType, isActive } = req.body;
    // if (
    //     [id, deviceId, deviceCode, deviceName].some((field: string) => field?.trim() === "")
    // ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    // if (isActive === undefined || typeof isActive !== "boolean") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    // }
    const updatedDevice = await device_model_1.Device.findByIdAndUpdate(id, {
        $set: {
            deviceId,
            deviceCode,
            deviceName,
            productType,
            isActive
        }
    }, {
        new: true
    });
    if (!updatedDevice) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the device.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedDevice, "Device updated successfully."));
});
exports.updateDevice = updateDevice;
const deleteDevice = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Device id is required.");
    }
    await device_model_1.Device.findByIdAndDelete(id);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Device has been deleted successfully."));
});
exports.deleteDevice = deleteDevice;
const getAllDevices = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    // const { noOfDocsEachPage, currentPageNumber } : IPagination = req.body;
    // if(noOfDocsEachPage === undefined || currentPageNumber === undefined) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Pagination variables are missing.");
    // }
    // if(typeof noOfDocsEachPage !== "number" || typeof currentPageNumber !== "number") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data provided."); 
    // }
    // const totalDevices: number = await Device.find({}).countDocuments() as number;
    const totalDevices = await device_model_1.Device.find({});
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
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, totalDevices, "Fetched all devices successfully."));
});
exports.getAllDevices = getAllDevices;
const searchDevice = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchQuery } = req.body;
    if (!searchQuery) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "No search query");
    }
    const searchedDocs = await device_model_1.Device.find({
        $or: [
            {
                deviceCode: {
                    $regex: searchQuery.toUpperCase()
                }
            },
            {
                deviceName: {
                    $regex: searchQuery
                }
            }
        ]
    });
    if (!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "No Devices found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, searchedDocs, "Records found successfully"));
});
exports.searchDevice = searchDevice;

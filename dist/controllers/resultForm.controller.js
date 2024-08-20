"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchInResult = exports.getSingleResultForm = exports.getAllResultForm = exports.deleteResultForm = exports.updateResultForm = exports.createNewResultForm = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const resultForm_model_1 = require("../models/resultForm.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const serviceForm_model_1 = require("../models/serviceForm.model");
const createNewResultForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { queryInformationLTFullName, queryInformationLTIndexNo, queryInformationLTAddress, queryInformationLTBusinessName, queryInformationLTInputDate, queryInformationStandardServeTo, queryInformationStandardDefendants, serviceResultInputDate, serviceResultScvType, serviceResultClientId, serviceResultJobNo, serviceResultServerId, serviceResultResults, serviceResultDateOfService, serviceResultFirstTimeOfService, serviceResultFirstAttemptDate, serviceResultSecondTimeOfService, serviceResultSecondAttemptDate, serviceResultThirdTimeOfService, serviceResultThirdAttemptDate, serviceResultlTServed, serviceResultlTNotServed, serviceResultRecipientTitle, serviceResultDoor, serviceResultDoorLocks, serviceResultEntry, serviceResultWall, serviceResultFloor, serviceResultLock, serviceResultOtherDescription, serviceResultSex, serviceResultSkinColor, serviceResultHair, serviceResultAge, serviceResultHeight, serviceResultWeight, serviceResultOtherFeatures, serviceResultDateOfMailing, serviceResultDateOfNotary, serviceResultRecipient } = req.body;
    if (!queryInformationLTFullName || !queryInformationLTIndexNo || !queryInformationLTAddress) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Missing required fields");
    }
    const createNewResultForm = await resultForm_model_1.ResultForm.create({
        queryInformationLTFullName,
        queryInformationLTIndexNo,
        queryInformationLTAddress,
        queryInformationLTBusinessName,
        queryInformationLTInputDate,
        queryInformationStandardServeTo,
        queryInformationStandardDefendants,
        serviceResultInputDate,
        serviceResultScvType,
        serviceResultClientId,
        serviceResultJobNo,
        serviceResultServerId,
        serviceResultResults,
        serviceResultDateOfService,
        serviceResultFirstTimeOfService,
        serviceResultFirstAttemptDate,
        serviceResultSecondTimeOfService,
        serviceResultSecondAttemptDate,
        serviceResultThirdTimeOfService,
        serviceResultThirdAttemptDate,
        serviceResultlTServed,
        serviceResultlTNotServed,
        serviceResultRecipientTitle,
        serviceResultRecipient,
        serviceResultDoor,
        serviceResultDoorLocks,
        serviceResultEntry,
        serviceResultWall,
        serviceResultFloor,
        serviceResultLock,
        serviceResultOtherDescription,
        serviceResultSex,
        serviceResultSkinColor,
        serviceResultHair,
        serviceResultAge,
        serviceResultHeight,
        serviceResultWeight,
        serviceResultOtherFeatures,
        serviceResultDateOfMailing,
        serviceResultDateOfNotary,
    });
    const isServiceExistsByJobNo = await serviceForm_model_1.ServiceForm.findOne({ jobNo: serviceResultJobNo });
    console.log("isServiceExistsByJobNo", isServiceExistsByJobNo);
    if (isServiceExistsByJobNo) {
        await serviceForm_model_1.ServiceForm.findOneAndUpdate({
            jobNo: serviceResultJobNo
        }, {
            $set: {
                resultFormId: createNewResultForm._id
            }
        });
        if (createNewResultForm) {
            console.log('====> Inside Attaching Result Service Form');
            try {
                await resultForm_model_1.ResultForm.findOneAndUpdate({
                    _id: createNewResultForm._id
                }, {
                    $set: {
                        serviceFormId: isServiceExistsByJobNo._id
                    }
                });
            }
            catch (error) {
                console.log('==>Error: ', error);
            }
        }
    }
    if (!createNewResultForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new result form");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, createNewResultForm, "New result form has been created"));
});
exports.createNewResultForm = createNewResultForm;
const updateResultForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { resultFormId, queryInformationLTFullName, queryInformationLTIndexNo, queryInformationLTAddress, queryInformationLTBusinessName, queryInformationLTInputDate, queryInformationStandardServeTo, queryInformationStandardDefendants, serviceResultInputDate, serviceResultScvType, serviceResultClientId, serviceResultJobNo, serviceResultServerId, serviceResultResults, serviceResultDateOfService, serviceResultFirstTimeOfService, serviceResultFirstAttemptDate, serviceResultSecondTimeOfService, serviceResultSecondAttemptDate, serviceResultThirdTimeOfService, serviceResultThirdAttemptDate, serviceResultlTServed, serviceResultlTNotServed, serviceResultRecipientTitle, serviceResultDoor, serviceResultDoorLocks, serviceResultEntry, serviceResultWall, serviceResultFloor, serviceResultLock, serviceResultOtherDescription, serviceResultSex, serviceResultSkinColor, serviceResultHair, serviceResultAge, serviceResultHeight, serviceResultWeight, serviceResultOtherFeatures, serviceResultDateOfMailing, serviceResultDateOfNotary, serviceResultRecipient } = req.body;
    if (!resultFormId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Result form Id is required");
    }
    if (!queryInformationLTFullName || !queryInformationLTIndexNo || !queryInformationLTAddress) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Missing required fields");
    }
    // if(typeof queryInformationLT !== "object" || typeof queryInformationStandard !== "object" || typeof serviceResults !== "object") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data types");
    // }
    const updatedResultForm = await resultForm_model_1.ResultForm.findByIdAndUpdate(resultFormId, {
        $set: {
            queryInformationLTFullName,
            queryInformationLTIndexNo,
            queryInformationLTAddress,
            queryInformationLTBusinessName,
            queryInformationLTInputDate,
            queryInformationStandardServeTo,
            queryInformationStandardDefendants,
            serviceResultInputDate,
            serviceResultScvType,
            serviceResultClientId,
            serviceResultJobNo,
            serviceResultServerId,
            serviceResultResults,
            serviceResultDateOfService,
            serviceResultFirstTimeOfService,
            serviceResultFirstAttemptDate,
            serviceResultSecondTimeOfService,
            serviceResultSecondAttemptDate,
            serviceResultThirdTimeOfService,
            serviceResultThirdAttemptDate,
            serviceResultlTServed,
            serviceResultlTNotServed,
            serviceResultRecipientTitle,
            serviceResultDoor,
            serviceResultDoorLocks,
            serviceResultEntry,
            serviceResultWall,
            serviceResultFloor,
            serviceResultLock,
            serviceResultOtherDescription,
            serviceResultSex,
            serviceResultSkinColor,
            serviceResultHair,
            serviceResultAge,
            serviceResultHeight,
            serviceResultWeight,
            serviceResultOtherFeatures,
            serviceResultDateOfMailing,
            serviceResultDateOfNotary
        }
    }, {
        new: true
    });
    if (!updatedResultForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the result form");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedResultForm, "Result form has been updated"));
});
exports.updateResultForm = updateResultForm;
const deleteResultForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { resultFormId } = req.body;
    if (!resultFormId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Result form Id is required");
    }
    await resultForm_model_1.ResultForm.findByIdAndDelete(resultFormId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Result form has been deleted"));
});
exports.deleteResultForm = deleteResultForm;
const getSingleResultForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { resultFormId } = req.body;
    if (!resultFormId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Result form id is required");
    }
    const singleResultForm = await resultForm_model_1.ResultForm.findById(resultFormId);
    if (!singleResultForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Result form not found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, singleResultForm, "Result form is found"));
});
exports.getSingleResultForm = getSingleResultForm;
const getAllResultForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { queryInformationLTFullName, queryInformationLTIndexNo, queryInformationLTAddress, queryInformationLTBusinessName, queryInformationLTInputDate, queryInformationStandardServeTo, queryInformationStandardDefendants, serviceResultInputDate, serviceResultScvType, serviceResultClientId, serviceResultJobNo, serviceResultServerId, serviceResultResults, serviceResultDateOfService, serviceResultFirstTimeOfService, serviceResultFirstAttemptDate, serviceResultSecondTimeOfService, serviceResultSecondAttemptDate, serviceResultThirdTimeOfService, serviceResultThirdAttemptDate, serviceResultlTServed, serviceResultlTNotServed, serviceResultRecipientTitle, serviceResultDoor, serviceResultDoorLocks, serviceResultEntry, serviceResultWall, serviceResultFloor, serviceResultLock, serviceResultOtherDescription, serviceResultSex, serviceResultSkinColor, serviceResultHair, serviceResultAge, serviceResultHeight, serviceResultWeight, serviceResultOtherFeatures, serviceResultDateOfMailing, serviceResultDateOfNotary, } = req.body;
    // if(!queryInformationLT || !queryInformationStandard || !serviceResults) {
    //     const allResultForms: IResultFormDocument[] = await ResultForm.find({
    //         $or: [
    //             {
    //                 queryInformationLT: {
    //                     $regex: queryInformationLT
    //                 }
    //             },
    //             {
    //                 queryInformationStandard: {
    //                     $regex: queryInformationStandard
    //                 }
    //             },
    //             {
    //                 serviceResults: {
    //                     $regex: serviceResults
    //                 }
    //             },
    //         ]
    //     }) as IResultFormDocument[];
    //     if(!allResultForms) {
    //         throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetchin all result forms")
    //     }
    //     return res
    //     .status(StatusCodes.OK)
    //     .json(
    //         new ApiResponse(StatusCodes.OK, allResultForms, "All results forms fetched successfully")
    //     );
    // }
    const allResultForms = await resultForm_model_1.ResultForm.find({}).populate(['serviceResultServerId']);
    if (!allResultForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetchin all result forms");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allResultForms, "All results forms fetched successfully"));
});
exports.getAllResultForm = getAllResultForm;
// const searchInResult = async (data: IResultFormDocument) => {
const searchInResult = async (req, res) => {
    try {
        const { queryInformationLTFullName, queryInformationLTIndexNo, queryInformationLTAddress, queryInformationLTBusinessName, queryInformationLTInputDate } = req.body;
        console.log("Received data:", queryInformationLTFullName, queryInformationLTIndexNo, queryInformationLTAddress, queryInformationLTBusinessName, queryInformationLTInputDate);
        if (!queryInformationLTFullName &&
            !queryInformationLTIndexNo &&
            !queryInformationLTAddress &&
            !queryInformationLTBusinessName &&
            !queryInformationLTInputDate) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Search data is missing");
        }
        // Transforming date fields
        const inputEnteredTransformed = queryInformationLTInputDate
            ? queryInformationLTInputDate.split('/').join('-')
            : null;
        // Dynamically building the query object
        const query = {};
        if (queryInformationLTFullName)
            query.queryInformationLTFullName = queryInformationLTFullName;
        if (queryInformationLTIndexNo)
            query.queryInformationLTIndexNo = queryInformationLTIndexNo;
        if (queryInformationLTAddress)
            query.queryInformationLTAddress = queryInformationLTAddress;
        if (queryInformationLTBusinessName)
            query.queryInformationLTBusinessName = queryInformationLTBusinessName;
        if (inputEnteredTransformed)
            query.queryInformationLTInputDate = inputEnteredTransformed;
        // Logging the query for debugging
        console.log('Query Object:', query);
        // Executing the query
        const resultForms = await resultForm_model_1.ResultForm.find(query);
        // Handling no results found
        if (resultForms.length === 0) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Result form is not found");
        }
        // Returning the results
        res.status(http_status_codes_1.StatusCodes.OK).json(resultForms);
    }
    catch (error) {
        // Error handling
        if (error instanceof ApiError_1.ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
        }
    }
};
exports.searchInResult = searchInResult;

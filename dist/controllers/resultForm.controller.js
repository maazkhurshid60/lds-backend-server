"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleResultForm = exports.getAllResultForm = exports.deleteResultForm = exports.updateResultForm = exports.createNewResultForm = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const resultForm_model_1 = require("../models/resultForm.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewResultForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { queryInformationLT, queryInformationStandard, serviceResults } = req.body;
    if (!queryInformationLT || !queryInformationStandard || !serviceResults) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Missing required fields");
    }
    if (typeof queryInformationLT !== "object" || typeof queryInformationStandard !== "object" || typeof serviceResults !== "object") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid data types");
    }
    const createNewResultForm = await resultForm_model_1.ResultForm.create({
        queryInformationLT,
        queryInformationStandard,
        serviceResults
    });
    if (!createNewResultForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new result form");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, createNewResultForm, "New result form has been created"));
});
exports.createNewResultForm = createNewResultForm;
const updateResultForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { resultFormId, queryInformationLT, queryInformationStandard, serviceResults } = req.body;
    if (!resultFormId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Result form Id is required");
    }
    if (!queryInformationLT || !queryInformationStandard || !serviceResults) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Missing required fields");
    }
    if (typeof queryInformationLT !== "object" || typeof queryInformationStandard !== "object" || typeof serviceResults !== "object") {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid data types");
    }
    const updatedResultForm = await resultForm_model_1.ResultForm.findByIdAndUpdate(resultFormId, {
        $set: {
            queryInformationLT,
            queryInformationStandard,
            serviceResults
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
    const { queryInformationLT, queryInformationStandard, serviceResults } = req.body;
    if (!queryInformationLT || !queryInformationStandard || !serviceResults) {
        const allResultForms = await resultForm_model_1.ResultForm.find({
            $or: [
                {
                    queryInformationLT: {
                        $regex: queryInformationLT
                    }
                },
                {
                    queryInformationStandard: {
                        $regex: queryInformationStandard
                    }
                },
                {
                    serviceResults: {
                        $regex: serviceResults
                    }
                },
            ]
        });
        if (!allResultForms) {
            throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetchin all result forms");
        }
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allResultForms, "All results forms fetched successfully"));
    }
    const allResultForms = await resultForm_model_1.ResultForm.find({});
    if (!allResultForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetchin all result forms");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allResultForms, "All results forms fetched successfully"));
});
exports.getAllResultForm = getAllResultForm;

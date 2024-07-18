"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleServiceForm = exports.getAllServiceForm = exports.deleteServiceForm = exports.updateServiceForm = exports.createNewServiceForm = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const serviceForm_model_1 = require("../models/serviceForm.model");
const client_model_1 = require("../models/client.model");
const serviceType_model_1 = require("../models/serviceType.model");
const lTServiceType_model_1 = require("../models/lTServiceType.model");
const standardServiceType_model_1 = require("../models/standardServiceType.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const createNewServiceForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const { jobNo, inputDate, clientId, serviceType, caseNo, caption, lTServiceType, otherLTServiceTypeData, lTServiceDetail, noOfAddLMailings, mailingAddresses, standardServiceType, otherStandardServiceTypeData, standardServiceDetail, } = req.body;
    if (!jobNo || !inputDate || !clientId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Required fields are missing");
    }
    const alreadyServiceExists = await serviceForm_model_1.ServiceForm.findOne({ jobNo });
    if (alreadyServiceExists) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, `Service Form with this Job no (${jobNo}) already exists`);
    }
    const client = await client_model_1.Client.findById(clientId);
    const serviceTypeDoc = await serviceType_model_1.ServiceType.findById(serviceType);
    const ltServiceTypeDoc = await lTServiceType_model_1.LTServiceType.findById(lTServiceType);
    const standardServiceTypeDoc = await standardServiceType_model_1.StandardServiceType.findById(standardServiceType);
    if (!client || !serviceTypeDoc || !ltServiceTypeDoc || !standardServiceTypeDoc) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid data has passed.");
    }
    const newServiceForm = await serviceForm_model_1.ServiceForm.create({
        jobNo,
        inputDate,
        clientId: client._id,
        serviceType: serviceTypeDoc._id,
        caseNo,
        caption,
        lTServiceType: ltServiceTypeDoc._id,
        otherLTServiceTypeData,
        lTServiceDetail,
        noOfAddLMailings,
        mailingAddresses,
        standardServiceType: standardServiceTypeDoc._id,
        otherStandardServiceTypeData,
        standardServiceDetail,
        serviceFormCreatedBy: user._id,
        lastUpdatedBy: user._id
    });
    if (!newServiceForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new service form");
    }
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.CREATED, newServiceForm, "New service form has been created"));
});
exports.createNewServiceForm = createNewServiceForm;
const updateServiceForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const user = req.user;
    const { serviceFormId, jobNo, inputDate, clientId, serviceType, caseNo, caption, lTServiceType, otherLTServiceTypeData, lTServiceDetail, noOfAddLMailings, mailingAddresses, standardServiceType, otherStandardServiceTypeData, standardServiceDetail, } = req.body;
    if (!serviceFormId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Service form id is required.");
    }
    if (!jobNo || !inputDate || !clientId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Required fields are missing.");
    }
    const client = await client_model_1.Client.findById(clientId);
    const serviceTypeDoc = await serviceType_model_1.ServiceType.findById(serviceType);
    const ltServiceTypeDoc = await lTServiceType_model_1.LTServiceType.findById(lTServiceType);
    const standardServiceTypeDoc = await standardServiceType_model_1.StandardServiceType.findById(standardServiceType);
    if (!client || !serviceTypeDoc || !ltServiceTypeDoc || !standardServiceTypeDoc) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid data has passed.");
    }
    const updatedServiceForm = await serviceForm_model_1.ServiceForm.findByIdAndUpdate(serviceFormId, {
        $set: {
            jobNo,
            inputDate,
            clientId: client._id,
            serviceType: serviceTypeDoc._id,
            caseNo,
            caption,
            lTServiceType: ltServiceTypeDoc._id,
            otherLTServiceTypeData,
            lTServiceDetail,
            noOfAddLMailings,
            mailingAddresses,
            standardServiceType: standardServiceTypeDoc._id,
            otherStandardServiceTypeData,
            standardServiceDetail,
            serviceFormCreatedBy: user._id,
            lastUpdatedBy: user._id
        }
    }, {
        new: true
    });
    if (!updatedServiceForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating service form.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedServiceForm, "Service form has been updated"));
});
exports.updateServiceForm = updateServiceForm;
const deleteServiceForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceFormId } = req.body;
    if (!serviceFormId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Service form id is required");
    }
    await serviceForm_model_1.ServiceForm.findByIdAndDelete(serviceFormId);
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, {}, "Service form has been deleted successfully."));
});
exports.deleteServiceForm = deleteServiceForm;
const getSingleServiceForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { serviceFormId } = req.body;
    if (!serviceFormId) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Service form id is required");
    }
    const singleServiceForm = await serviceForm_model_1.ServiceForm.findById(serviceFormId);
    if (!singleServiceForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Service form not found");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, singleServiceForm, "Service form is found"));
});
exports.getSingleServiceForm = getSingleServiceForm;
const getAllServiceForm = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { jobNo, inputDate, clientId, serviceType, } = req.body;
    // if(jobNo !== 0 || !inputDate || !clientId || !serviceType) {
    //     const allServiceForms: IServiceFormDocument[] = await ServiceForm.find({
    //         $or: [
    //             {
    //                 jobNo: jobNo
    //             },
    //             {inputDate: {
    //                 $regex: inputDate
    //             }},
    //             {clientId: {
    //                 $regex: clientId
    //             }},
    //             {serviceType: {
    //                 $regex: serviceType
    //             }},
    //         ]
    //     })
    //     .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy']) as IServiceFormDocument[];
    //     if(!allServiceForms) {
    //         throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service forms");
    //     }
    //     return res
    //     .status(StatusCodes.OK)
    //     .json(
    //         new ApiResponse(StatusCodes.OK, allServiceForms, "All service forms fetched successfully (Searched).")
    //     );
    // } 
    const allServiceForms = await serviceForm_model_1.ServiceForm.find({})
        .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy']);
    if (!allServiceForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service forms");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allServiceForms, "All service forms fetched successfully."));
});
exports.getAllServiceForm = getAllServiceForm;

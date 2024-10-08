"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeServiceForms = exports.getSingleServiceForm = exports.getAllServiceForm = exports.deleteServiceForm = exports.updateServiceForm = exports.createNewServiceForm = void 0;
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
    const { jobNo, inputDate, clientId, serviceType, caseNo, caption, lTServiceType, oLTIndexNo, oLTDescription, lTSFirstName, lTSBusinessName, lTSZip, lTSState, lTSCity, lTSApt, lTSAddress, lTSDescription, noOfAddLMailings, mailingAddresses, standardServiceType, oSSTIndexNo, oSSTDescription, sSDCourt, sSDDefendants, sSDPlaintiff, sSDCountry, datePairs } = req.body;
    const alreadyServiceExists = await serviceForm_model_1.ServiceForm.findOne({ jobNo });
    if (alreadyServiceExists) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, `Service Form with this Job no (${jobNo}) already exists`);
    }
    const client = await client_model_1.Client.findById(clientId);
    const serviceTypeDoc = await serviceType_model_1.ServiceType.findById(serviceType);
    const ltServiceTypeDoc = await lTServiceType_model_1.LTServiceType.findById(lTServiceType);
    const standardServiceTypeDoc = await standardServiceType_model_1.StandardServiceType.findById(standardServiceType);
    const newServiceForm = await serviceForm_model_1.ServiceForm.create({
        jobNo,
        inputDate,
        clientId: client?._id,
        serviceType: serviceTypeDoc?._id,
        caseNo,
        caption,
        lTServiceType: ltServiceTypeDoc?._id,
        oLTIndexNo,
        oLTDescription,
        lTSFirstName,
        lTSBusinessName,
        lTSZip,
        lTSState,
        lTSCity,
        lTSApt,
        lTSAddress,
        lTSDescription,
        noOfAddLMailings,
        mailingAddresses,
        standardServiceType: standardServiceTypeDoc?._id,
        oSSTIndexNo,
        oSSTDescription,
        sSDCourt,
        sSDDefendants,
        sSDPlaintiff,
        sSDCountry,
        serviceFormCreatedBy: user._id,
        lastUpdatedBy: user._id,
        datePairs
    });
    console.log("line passed 118", newServiceForm);
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
    const { serviceFormId, jobNo, inputDate, clientId, serviceType, caseNo, caption, lTServiceType, oLTIndexNo, oLTDescription, lTSFirstName, lTSBusinessName, lTSZip, lTSState, lTSCity, lTSApt, lTSAddress, lTSDescription, noOfAddLMailings, mailingAddresses, standardServiceType, oSSTIndexNo, oSSTDescription, sSDCourt, sSDDefendants, sSDPlaintiff, sSDCountry, datePairs, 
    //Result Form Attributes
    queryInformationLTFullName, queryInformationLTIndexNo, queryInformationLTAddress, queryInformationLTBusinessName, queryInformationLTInputDate, queryInformationStandardServeTo, queryInformationStandardDefendants, serviceResultInputDate, serviceResultScvType, serviceResultClientId, serviceResultJobNo, serviceResultServerId, serviceResultResults, serviceResultDateOfService, serviceResultFirstTimeOfService, serviceResultFirstAttemptDate, serviceResultSecondTimeOfService, serviceResultSecondAttemptDate, serviceResultThirdTimeOfService, serviceResultThirdAttemptDate, serviceResultlTServed, serviceResultlTNotServed, serviceResultSubstitudeDeliveredTo, serviceResultRecipientTitle, serviceResultRecipient, serviceResultDoor, serviceResultDoorLocks, serviceResultEntry, serviceResultWall, serviceResultFloor, serviceResultLock, serviceResultOtherDescription, serviceResultSex, serviceResultSkinColor, serviceResultHair, serviceResultAge, serviceResultHeight, serviceResultWeight, serviceResultOtherFeatures, serviceResultDateOfMailing, serviceResultDateOfNotary, serviceResultTimeOfService, timeTrip, } = req.body;
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
    const updatedServiceForm = await serviceForm_model_1.ServiceForm.findByIdAndUpdate(serviceFormId, {
        $set: {
            jobNo,
            inputDate,
            clientId: client?._id,
            serviceType: serviceTypeDoc?._id,
            caseNo,
            caption,
            lTServiceType: ltServiceTypeDoc?._id,
            oLTIndexNo,
            oLTDescription,
            lTSFirstName,
            lTSBusinessName,
            lTSZip,
            lTSState,
            lTSCity,
            lTSApt,
            lTSAddress,
            lTSDescription,
            noOfAddLMailings,
            mailingAddresses,
            standardServiceType: standardServiceTypeDoc?._id,
            oSSTIndexNo,
            oSSTDescription,
            sSDCourt,
            sSDDefendants,
            sSDPlaintiff,
            sSDCountry,
            serviceFormCreatedBy: user._id,
            lastUpdatedBy: user._id,
            datePairs,
            //Result Form Attributes
            queryInformationLTFullName,
            queryInformationLTIndexNo,
            queryInformationLTAddress,
            queryInformationLTBusinessName,
            queryInformationLTInputDate,
            queryInformationStandardServeTo,
            queryInformationStandardDefendants,
            serviceResultInputDate,
            serviceResultScvType,
            serviceResultClientId: client?._id,
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
            serviceResultSubstitudeDeliveredTo,
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
            serviceResultTimeOfService,
            timeTrip
        }
    }, {
        new: true
    });
    if (!updatedServiceForm) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating service form.");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, updatedServiceForm, "Form has been updated"));
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
// const getDateRangeServiceForms = asyncHandler(async (req: Request, res: Response) => {
//     const { startDate, endDate ,jobNo}: { startDate: string, endDate: string } = req.body;
//     const startD = new Date(startDate);
//     const endD = new Date(endDate)
//         .setHours(23, 59, 59);
//     const allServiceForms: IServiceFormDocument[] = await ServiceForm.find({ "createdAt": { "$gte": new Date(startD), "$lte": new Date(endD) } }).sort({ dataField: -1 }).populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'serviceResultServerId']) as IServiceFormDocument[];
//     if (!allServiceForms) {
//         throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service forms");
//     }
//     return res
//         .status(StatusCodes.OK)
//         .json(
//             new ApiResponse(StatusCodes.OK, allServiceForms, "All service forms fetched successfully.")
//         );
// });
// const getDateRangeServiceForms = asyncHandler(async (req: Request, res: Response) => {
//     const { startDate, endDate, jobNo, clientId, caseNo, serviceType, lTSFirstName, lTSBusinessName,
//         lTSAddress,
//         lTSApt,
//         lTSCity,
//         lTSZip,
//         oLTDescription,
//         lTSDescription,
//         serviceResultDateOfService,
//         serviceResultFirstAttemptDate,
//         serviceResultSecondAttemptDate,
//         serviceResultThirdAttemptDate,
//         serviceResultDateOfMailing,
//         serviceResultRecipientTitle,
//         substituteDeliveredTo,
//         corporateRecipient,
//         sSDDefendants,
//         sSDPlaintiff,
//         oSSTDescription, oSSTIndexNo, oLTIndexNo, lTSState,
//         sSDCourt } = req.body;
//     // Build query object
//     let query: any = {};
//     if (startDate || endDate) {
//         const startD = startDate ? new Date(startDate) : new Date(0); // Default to start of time if no startDate
//         const endD = endDate ? new Date(endDate).setHours(23, 59, 59) : new Date(); // Default to end of time if no endDate
//         query.createdAt = {
//             $gte: new Date(startD),
//             $lte: new Date(endD)
//         };
//     }
//     if (jobNo) {
//         query.jobNo = jobNo;
//     }
//     if (clientId) {
//         query.clientId = clientId;
//     }
//     if (caseNo) {
//         query.caseNo = caseNo;
//     }
//     if (oLTIndexNo) {
//         query.oLTIndexNo = oLTIndexNo;
//     }
//     if (lTSState) {
//         query.lTSState = lTSState;
//     }
//     if (serviceType) {
//         query.serviceType = serviceType;
//     }
//     if (lTSFirstName) {
//         query.lTSFirstName = lTSFirstName;
//     }
//     if (lTSBusinessName) {
//         query.lTSBusinessName = lTSBusinessName;
//     }
//     if (lTSAddress) {
//         query.lTSAddress = lTSAddress;
//     }
//     if (lTSApt) {
//         query.lTSApt = lTSApt;
//     }
//     if (lTSCity) {
//         query.lTSCity = lTSCity;
//     }
//     if (lTSZip) {
//         query.lTSZip = lTSZip;
//     }
//     if (oLTDescription) {
//         query.oLTDescription = oLTDescription;
//     }
//     if (lTSDescription) {
//         query.lTSDescription = lTSDescription;
//     }
//     if (serviceResultDateOfService) {
//         query.serviceResultDateOfService = serviceResultDateOfService;
//     }
//     if (serviceResultFirstAttemptDate) {
//         query.serviceResultFirstAttemptDate = serviceResultFirstAttemptDate;
//     }
//     if (serviceResultSecondAttemptDate) {
//         query.serviceResultSecondAttemptDate = serviceResultSecondAttemptDate;
//     }
//     if (serviceResultThirdAttemptDate) {
//         query.serviceResultThirdAttemptDate = serviceResultThirdAttemptDate;
//     }
//     if (serviceResultDateOfMailing) {
//         query.serviceResultDateOfMailing = serviceResultDateOfMailing;
//     }
//     if (serviceResultRecipientTitle) {
//         query.serviceResultRecipientTitle = serviceResultRecipientTitle;
//     }
//     if (substituteDeliveredTo) {
//         query.substituteDeliveredTo = substituteDeliveredTo;
//     }
//     if (corporateRecipient) {
//         query.corporateRecipient = corporateRecipient;
//     }
//     if (sSDDefendants) {
//         query.sSDDefendants = sSDDefendants;
//     }
//     if (sSDPlaintiff) {
//         query.sSDPlaintiff = sSDPlaintiff;
//     }
//     if (oSSTDescription) {
//         query.oSSTDescription = oSSTDescription;
//     }
//     if (oSSTIndexNo) {
//         query.oSSTIndexNo = oSSTIndexNo;
//     }
//     if (sSDCourt) {
//         query.sSDCourt = sSDCourt;
//     }
//     try {
//         // Fetch data based on the query
//         const allServiceForms: any[] = await ServiceForm.find(query)
//             .sort({ dataField: -1 })
//             .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'serviceResultServerId'])
//             .exec();
//         // Check if data was fetched
//         if (!allServiceForms || allServiceForms.length === 0) {
//             return res
//                 .status(StatusCodes.NOT_FOUND)
//                 .json(new ApiResponse(StatusCodes.NOT_FOUND, [], "No service forms found matching the criteria."));
//         }
//         return res
//             .status(StatusCodes.OK)
//             .json(new ApiResponse(StatusCodes.OK, allServiceForms, "Service forms fetched successfully."));
//     } catch (error) {
//         // Handle errors
//         console.error(error);
//         throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while fetching service forms.");
//     }
// });
const getDateRangeServiceForms = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { startDate, endDate, jobNo, clientId, caseNo, serviceType, lTSFirstName, lTSBusinessName, lTSAddress, lTSApt, lTSCity, lTSZip, oLTDescription, lTSDescription, serviceResultDateOfService, serviceResultFirstAttemptDate, serviceResultSecondAttemptDate, serviceResultThirdAttemptDate, serviceResultDateOfMailing, serviceResultRecipientTitle, serviceResultSubstitudeDeliveredTo, serviceResultRecipient, sSDDefendants, sSDPlaintiff, oSSTDescription, oSSTIndexNo, oLTIndexNo, lTSState, sSDCourt } = req.body;
    // Build query object
    let query = {};
    // Handle date range filters
    if (startDate || endDate) {
        const startD = startDate ? new Date(startDate) : new Date(0); // Default to start of time if no startDate
        const endD = endDate ? new Date(endDate).setHours(23, 59, 59) : new Date(); // Default to end of time if no endDate
        query.createdAt = {
            $gte: new Date(startD),
            $lte: new Date(endD)
        };
    }
    // Handle partial matching for all fields dynamically
    const fields = [
        "oLTIndexNo", "lTSState", "lTSFirstName",
        "lTSBusinessName", "lTSAddress", "lTSApt", "lTSCity", "lTSZip", "oLTDescription", "lTSDescription",
        "serviceResultDateOfService", "serviceResultFirstAttemptDate", "serviceResultSecondAttemptDate",
        "serviceResultThirdAttemptDate", "serviceResultDateOfMailing", "serviceResultRecipientTitle",
        "serviceResultSubstitudeDeliveredTo", "serviceResultRecipient", "sSDDefendants", "sSDPlaintiff", "oSSTDescription",
        "oSSTIndexNo", "sSDCourt"
    ];
    if (jobNo) {
        query.jobNo = jobNo;
    }
    if (clientId) {
        query.clientId = clientId;
    }
    if (serviceType) {
        query.serviceType = serviceType;
    }
    if (caseNo) {
        query.caseNo = caseNo;
    }
    // Loop over all fields and apply regex or exact match based on field type
    fields.forEach((field) => {
        if (req.body[field]) {
            if (field === 'jobNo') {
                // jobNo is a number but we want partial matching, so treat it as a string
                const jobNoValue = req.body[field].toString(); // Convert to string for regex matching
                query[field] = { $regex: jobNoValue, $options: 'i' }; // Case-insensitive partial match
            }
            else if (typeof req.body[field] === 'string') {
                // Apply regex for string fields
                query[field] = { $regex: req.body[field], $options: 'i' }; // Case-insensitive partial match
            }
            else if (typeof req.body[field] === 'number') {
                // Exact match for numeric fields
                query[field] = req.body[field];
            }
        }
    });
    try {
        // Fetch data based on the query
        const allServiceForms = await serviceForm_model_1.ServiceForm.find(query)
            .sort({ dataField: -1 })
            .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'serviceResultServerId'])
            .exec();
        // Check if data was fetched
        if (!allServiceForms || allServiceForms.length === 0) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.NOT_FOUND, [], "No service forms found matching the criteria."));
        }
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allServiceForms, "Service forms fetched successfully."));
    }
    catch (error) {
        // Handle errors
        console.error(error);
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while fetching service forms.");
    }
});
exports.getDateRangeServiceForms = getDateRangeServiceForms;
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
        .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'serviceResultServerId']);
    if (!allServiceForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service forms");
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, allServiceForms, "All service forms fetched successfully."));
});
exports.getAllServiceForm = getAllServiceForm;

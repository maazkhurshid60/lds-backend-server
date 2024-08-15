"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchInResult = exports.searchInStandard = exports.searchInService = exports.search = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const serviceForm_model_1 = require("../models/serviceForm.model");
const resultForm_model_1 = require("../models/resultForm.model");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = require("../utils/ApiResponse");
const search = (0, AsyncHandler_1.asyncHandler)(async (req, res) => {
    const { searchIn, data } = req.body;
    let result;
    if (!searchIn || typeof searchIn === 'undefined') {
        return new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "SearchIn is missing");
    }
    try {
        if (searchIn === 'service') {
            result = await searchInService(data);
        }
        else if (searchIn === 'result') {
            result = await searchInResult(data);
        }
        else if (searchIn === 'standard') {
            result = await searchInStandard(data);
        }
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json(new ApiResponse_1.ApiResponse(http_status_codes_1.StatusCodes.OK, result, "Service forms fetched successfully"));
    }
    catch (error) {
        throw error;
    }
});
exports.search = search;
const searchInService = async (data) => {
    if (!data) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Search data is missing");
    }
    let dateTranformed = data.dateCreated ? data.dateCreated.split('/').join('-') : null;
    let populateData = ['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy'];
    console.log('Date Transformed: ', dateTranformed);
    const serviceForms = await serviceForm_model_1.ServiceForm.find({
        $or: [
            {
                inputDate: dateTranformed ? dateTranformed : null,
            },
            {
                jobNo: data.jobNo ? data.jobNo : null
            },
            {
                clientId: data.clientId ? data.clientId : null
            },
            {
                serviceType: data.serviceType ? data.serviceType : null
            },
            {
                caseNo: data.caseNo ? data.caseNo : null
            },
            {
                fullName: data.fullName ? data.fullName : null
            },
            {
                commercialDescription: data?.commercialDescription ? data?.commercialDescription : null,
            },
            {
                zip: data?.zip ? data?.zip : null,
            },
            {
                state: data?.state ? data?.state : null,
            },
            {
                city: data?.city ? data?.city : null,
            },
            {
                apt: data?.apt ? data?.apt : null,
            },
            {
                address: data?.address ? data?.address : null,
            },
            {
                businessName: data?.businessName ? data?.businessName : null,
            },
            {
                otherLTDescription: data?.businessName ? data?.businessName : null,
            }
            // {
            //     lTServiceType: data.lTServiceTypes ? data.lTServiceTypes.forEach((lt: string) => lt) : null 
            // },
        ]
    }).populate(populateData);
    if (serviceForms.length === 0 || !serviceForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Service form is not found");
    }
    return serviceForms;
};
exports.searchInService = searchInService;
const searchInResult = async (data) => {
    if (!data) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Search data is missing");
    }
    let dateEnteredTransformed = data.dateEntered ? data.dateEntered.split('/').join('-') : null;
    let dateServiceTransformed = data?.dateService ? data?.dateService.split("/").join("-") : null;
    let dateFirstAttemptTransformed = data?.date1Attepmt ? data?.date1Attepmt.split("/").join("-") : null;
    let dateSecondAttepmtTransformed = data?.date2Attepmt ? data?.date2Attepmt.split("/").join("-") : null;
    let dateThirdAttepmtTransformed = data?.date3Attepmt ? data?.dateEntered?.split("/").join("-") : null;
    let dateMailingTransformed = data?.dateMailing ? data?.dateMailing?.split("/").join("-") : null;
    let populateData = ['resultOptions', 'serviceTypeOptions', 'substituteDeliveredTo'];
    const resultForms = await resultForm_model_1.ResultForm.find({
        $or: [
            { queryInformationLTInputDate: dateEnteredTransformed ? dateEnteredTransformed : null },
            { serviceResultDateOfService: dateServiceTransformed ? dateServiceTransformed : null },
            { serviceResultFirstAttemptDate: dateFirstAttemptTransformed ? dateFirstAttemptTransformed : null },
            { serviceResultSecondAttemptDate: dateSecondAttepmtTransformed ? dateSecondAttepmtTransformed : null },
            { serviceResultThirdAttemptDate: dateThirdAttepmtTransformed ? dateThirdAttepmtTransformed : null },
            { serviceResultDateOfMailing: dateMailingTransformed ? dateMailingTransformed : null },
            { serviceResultResults: data?.resultOptions ? data?.resultOptions : null },
            { serviceResultScvType: data?.serviceTypeOptions ? data?.serviceTypeOptions : null },
            { substituteDeliveredTo: data?.substituteDeliveredTo ? data?.substituteDeliveredTo : null },
            { serviceResultRecipient: data?.corpRecipient ? data?.corpRecipient : null },
            { serviceResultRecipientTitle: data?.corpRecipientTitle ? data?.corpRecipientTitle : null },
        ]
    }).populate(populateData);
    if (resultForms.length === 0 || !resultForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Result form is not found");
    }
    return resultForms;
};
exports.searchInResult = searchInResult;
const searchInStandard = async (data) => {
    if (!data) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Search data is missing");
    }
    const serviceForms = await serviceForm_model_1.ServiceForm.find({
        $or: [
            {
                oSSTDescription: data?.otherStdDescription ? data?.otherStdDescription : null
            },
            {
                oSSTIndexNo: data?.indexNumber ? data?.indexNumber : null
            },
            {
                sSDCourt: data?.court ? data?.court : null
            },
            {
                cityServe: data?.city ? data?.city : null
            },
            {
                sSDCountry: data?.country ? data?.country : null
            },
            {
                sSDPlaintiff: data?.plaintiff ? data?.plaintiff : null
            },
            {
                sSDDefendants: data?.defendant ? data?.defendant : null
            },
            {
                firstNameServe: data?.fullName ? data?.fullName : null
            },
            {
                addressServe: data?.address ? data?.address : null
            },
            {
                aptServe: data?.apt ? data?.apt : null
            },
            {
                zipServe: data?.zip ? data?.zip : null
            },
        ]
    });
    if (serviceForms.length === 0 || !serviceForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Standard Service form is not found");
    }
    return serviceForms;
};
exports.searchInStandard = searchInStandard;
const checkltServiceDetail = (data) => {
    if (data.fullName || data.businessName || data.address || data.apt || data.city || data.zip || data.commercialDescription) {
        return true;
    }
    return false;
};

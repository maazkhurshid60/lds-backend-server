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
let serviceFormPopulate = ['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'resultFormId'];
const searchInService = async (data) => {
    console.log("data>>>>>>>>>", data);
    if (Object.keys(data).length === 0 && data.constructor === Object) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Search data is missing");
    }
    let dateTranformed = data.dateCreated ? data.dateCreated.split('/').join('-') : null;
    // let populateData = ['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'resultFormId'];
    console.log('Date Transformed: ', dateTranformed);
    // Create a dynamic query object
    let query = {};
    if (dateTranformed)
        query.inputDate = dateTranformed;
    if (data.jobNo)
        query.jobNo = data.jobNo;
    if (data.clientId)
        query.clientId = data.clientId;
    if (data.serviceType)
        query.serviceType = data.serviceType;
    if (data.caseNo)
        query.caseNo = data.caseNo;
    if (data.fullName)
        query.fullName = data.fullName;
    if (data.commercialDescription)
        query.commercialDescription = data.commercialDescription;
    if (data.zip)
        query.zip = data.zip;
    if (data.state)
        query.state = data.state;
    if (data.city)
        query.city = data.city;
    if (data.apt)
        query.apt = data.apt;
    if (data.address)
        query.address = data.address;
    if (data.businessName)
        query.businessName = data.businessName;
    if (data.otherLTDescription)
        query.otherLTDescription = data.otherLTDescription;
    console.log("query>>>>>>>>>>>>>>>>>>>>>>>>>>>>", query);
    const serviceForms = await serviceForm_model_1.ServiceForm.find(query).populate(serviceFormPopulate);
    // const resultForms: IResultFormDocument[] = await ResultForm.find(query) as IResultFormDocument[];
    // if (dateTranformed) query.queryInformationLTInputDate = dateTranformed;
    // if (data.jobNo) query.serviceResultJobNo = data.jobNo;
    // if (data.clientId) query.serviceResultClientId = data.clientId;
    // if (data.serviceType) query.serviceResultScvType = data.serviceType;
    // if (data.caseNo) query.caseNo = data.caseNo;
    // if (data.fullName) query.queryInformationLTFullName = data.fullName;
    // if (data.commercialDescription) query.commercialDescription = data.commercialDescription;
    // if (data.zip) query.zip = data.zip;
    // if (data.state) query.state = data.state;
    // if (data.city) query.city = data.city;
    // if (data.apt) query.apt = data.apt;
    // if (data.address) query.queryInformationLTAddress = data.address;
    // if (data.businessName) query.queryInformationLTBusinessName = data.businessName;
    // if (data.otherLTDescription) query.otherLTDescription = data.otherLTDescription;
    console.log("query>>>>>>>>>>>>>>>>>>>>>>>>>>>>", query);
    // const serviceForms: IServiceFormDocument[] = await ServiceForm.find(query).populate(populateData) as IServiceFormDocument[];
    // const resultForms: IResultFormDocument[] = await ResultForm.find(query).populate(populateData) as IResultFormDocument[];
    console.log("resultForms>>>>>>>>>>>>>>>>>>>>>>>>>>>>", serviceForms);
    if (serviceForms.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "result form is not found");
    }
    return serviceForms;
};
exports.searchInService = searchInService;
const searchInResult = async (data) => {
    if (!data) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Search data is missing");
    }
    // Transforming date fields
    const dateEnteredTransformed = data.dateEntered ? data.dateEntered.split('/').join('-') : null;
    const dateServiceTransformed = data.dateService ? data.dateService.split("/").join("-") : null;
    const dateFirstAttemptTransformed = data.date1Attepmt ? data.date1Attepmt.split("/").join("-") : null;
    const dateSecondAttemptTransformed = data.date2Attepmt ? data.date2Attepmt.split("/").join("-") : null;
    const dateThirdAttemptTransformed = data.date3Attepmt ? data.date3Attepmt.split("/").join("-") : null;
    const dateMailingTransformed = data.dateMailing ? data.dateMailing.split("/").join("-") : null;
    // let populateData = [...serviceFormPopulate, 'serviceFormId', 'serviceResultClientId', 'serviceResultServerId'];
    let populateData = ['serviceResultClientId', 'serviceResultServerId'];
    // Dynamically building the query object
    const query = {};
    if (dateEnteredTransformed)
        query.queryInformationLTInputDate = dateEnteredTransformed;
    if (dateServiceTransformed)
        query.serviceResultDateOfService = dateServiceTransformed;
    if (dateFirstAttemptTransformed)
        query.serviceResultFirstAttemptDate = dateFirstAttemptTransformed;
    if (dateSecondAttemptTransformed)
        query.serviceResultSecondAttemptDate = dateSecondAttemptTransformed;
    if (dateThirdAttemptTransformed)
        query.serviceResultThirdAttemptDate = dateThirdAttemptTransformed;
    if (dateMailingTransformed)
        query.serviceResultDateOfMailing = dateMailingTransformed;
    if (data.serviceTypeOptions)
        query.serviceResultScvType = data.serviceTypeOptions;
    if (data.substituteDeliveredTo)
        query.substituteDeliveredTo = data.substituteDeliveredTo;
    if (data.corpRecipient)
        query.serviceResultRecipient = data.corpRecipient;
    if (data.corpRecipientTitle)
        query.serviceResultRecipientTitle = data.corpRecipientTitle;
    // Logging the query for debugging
    console.log('Query Object:', query);
    // Executing the query
    const resultForms = await resultForm_model_1.ResultForm.find(query).populate(populateData).populate('serviceFormId') // Populates serviceFormId first
        .populate({
        path: 'serviceFormId.clientId', // Then populate the nested clientId
        model: 'Client' // Ensure this references the correct model
    });
    // Handling no results found
    if (resultForms.length === 0) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Result form is not found");
    }
    return resultForms;
};
exports.searchInResult = searchInResult;
const searchInStandard = async (data) => {
    if (!data) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Search data is missing");
    }
    // let populateData = ['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy','resultFormId'];
    // Dynamically building the query object
    const query = {};
    if (data.otherStdDescription)
        query.oSSTDescription = data.otherStdDescription;
    if (data.indexNumber)
        query.oSSTIndexNo = data.indexNumber;
    if (data.court)
        query.sSDCourt = data.court;
    if (data.city)
        query.cityServe = data.city;
    if (data.country)
        query.sSDCountry = data.country;
    if (data.plaintiff)
        query.sSDPlaintiff = data.plaintiff;
    if (data.defendant)
        query.sSDDefendants = data.defendant;
    if (data.fullName)
        query.firstNameServe = data.fullName;
    if (data.address)
        query.addressServe = data.address;
    if (data.apt)
        query.aptServe = data.apt;
    if (data.zip)
        query.zipServe = data.zip;
    // Logging the query for debugging
    console.log('Query Object:', query);
    // Executing the query
    const serviceForms = await serviceForm_model_1.ServiceForm.find(query).populate(serviceFormPopulate);
    // const serviceForms: IServiceFormDocument[] = await ServiceForm.find(query).populate(populateData);
    // Handling no results found
    if (serviceForms.length === 0) {
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

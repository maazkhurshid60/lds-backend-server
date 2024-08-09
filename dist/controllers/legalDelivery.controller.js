"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const serviceForm_model_1 = require("../models/serviceForm.model");
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
        }
        else if (searchIn === 'standard') {
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
                lTServiceType: data.lTServiceTypes ? data.lTServiceTypes.forEach((lt) => lt) : null
            }
            // {
            //     // lTServiceDetail: checkltServiceDetail(data) ? { 
            //     //     'full-name': data.fullName ? data.fullName : null,
            //     //     'business-name': data.businessName ? data.businessName : null,
            //     //     'address' : data.address ? data.address : null,
            //     //     'apt' : data.apt ? data.apt : null,
            //     //     'state': data.state ? data.state : null,
            //     //     'city' : data.city ? data.city : null,
            //     //     'zip' : data.zip ? data.zip : null,
            //     //     'description': data.commercialDescription ? data.commercialDescription : null
            //     // } : null                
            // }
        ]
    }).populate(populateData);
    // if(checkltServiceDetail(data)) {
    //     const serviceForms: IServiceFormDocument[] = await ServiceForm.find({}) as IServiceFormDocument[];
    //     const filtered = serviceForms.find((form, index) => {
    //         const formObj = form.lTServiceDetail;
    //         const valArray: string[] = [];
    //         for (let v of formObj){
    //             valArray.push(v[1]);
    //         }
    //         const obj: Schema.Types.Map = {
    //             fullName: data.fullName ? data.fullName : valArray[0] ?? '',
    //             businessName: data.businessName ? data.businessName : valArray[1] ?? '',
    //             address: data.address ? data.address : valArray[2] ?? '',
    //             apt: data.apt ? data.apt : valArray[3] ?? '',
    //             state: data.state ? data.state : valArray[4] ?? '',
    //             city: data.city ? data.city : valArray[5] ?? '',
    //             zip: data.zip ? data.zip : valArray[6] ?? '',
    //             description: data.commercialDescription ? data.commercialDescription : valArray[7] ?? ''
    //         } as unknown as Schema.Types.Map;
    //         // console.log('Form: ', formObj);
    //         console.log('Object: ', obj);
    //         console.log(form.lTServiceDetail == obj);
    //         return form.lTServiceDetail == obj;
    //     });
    //     console.log('Filtered: ', filtered);
    // }
    if (serviceForms.length === 0 || !serviceForms) {
        throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, "Service forms not found");
    }
    return serviceForms;
};
const searchInResult = async () => { };
const searchInStandard = async () => { };
const checkltServiceDetail = (data) => {
    if (data.fullName || data.businessName || data.address || data.apt || data.city || data.zip || data.commercialDescription) {
        return true;
    }
    return false;
};

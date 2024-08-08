import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { IServiceFormDocument, ServiceForm } from "../models/serviceForm.model";
import { ResultForm } from "../models/resultForm.model";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";
import { Schema } from "mongoose";

export interface ISearchService {
    dateCreated?: string | undefined | null,
    jobNo?: number | undefined | null,
    clientId?: any | undefined | null,
    serviceType?: any | undefined | null,
    caseNo?: number | undefined | null,
    fullName?: string | undefined | null,
    businessName?: string | undefined | null,
    address?: string | undefined | null,
    apt?: string | undefined | null,
    city?: string | undefined | null,
    state?: string | undefined | null,
    zip?: string | undefined | null,
    commercialDescription?: string | undefined | null,
    otherLTDescription?: string | undefined | null,
    otherOptions?: any[] | undefined | null,
    lTServiceTypes?: any[] | undefined | null 
}


const search = asyncHandler( async (req: Request, res: Response) => {

    const { searchIn, data } : { searchIn : string, data: any } = req.body;
    let result: any;

    if( !searchIn || typeof searchIn === 'undefined' ) {
        return new ApiError(StatusCodes.BAD_REQUEST, "SearchIn is missing");
    }

    try {

        if(searchIn === 'service') {

            result = await searchInService(data);

        } else if (searchIn === 'result') {
    
        } else if (searchIn === 'standard') {
    
        }

        return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, result, "Service forms fetched successfully")
        );
    
        
    } catch (error) {
        throw error;
    }
    
} );

const searchInService = async (data: ISearchService) => {

    if (!data) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Search data is missing");
    }

    let dateTranformed = data.dateCreated ? data.dateCreated.split('/').join('-') : null;
    let populateData = ['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy'];

    console.log('Date Transformed: ', dateTranformed);

    const serviceForms: IServiceFormDocument[] = await ServiceForm.find({
        
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
                lTServiceType: data.lTServiceTypes ? data.lTServiceTypes.forEach((lt: string) => lt) : null 
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
    }).populate(populateData) as IServiceFormDocument[];

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

    if(serviceForms.length === 0 || !serviceForms) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service forms not found")
    }

    return serviceForms;

}

const searchInResult = async () => {}

const searchInStandard = async () => {}

const checkltServiceDetail = (data: ISearchService) => {
    if(data.fullName || data.businessName || data.address || data.apt || data.city || data.zip || data.commercialDescription) {
        return true;
    }

    return false
}

export {
    search
} 
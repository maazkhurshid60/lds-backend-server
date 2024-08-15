import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { IServiceFormDocument, ServiceForm } from "../models/serviceForm.model";
import { IResultFormDocument, ResultForm } from "../models/resultForm.model";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";
import { Schema } from "mongoose";
import { ISearchResult, ISearchService ,ISearchStandard} from "../interfaces/legalDelivery.interface";



const search = asyncHandler(async (req: Request, res: Response) => {

    const { searchIn, data }: { searchIn: string, data: any } = req.body;
    let result: any;

    if (!searchIn || typeof searchIn === 'undefined') {
        return new ApiError(StatusCodes.BAD_REQUEST, "SearchIn is missing");
    }

    try {

        if (searchIn === 'service') {

            result = await searchInService(data);

        } else if (searchIn === 'result') {
            result=await searchInResult(data)

        } else if (searchIn === 'standard') {
            result=await searchInStandard(data)
        }

        return res
            .status(StatusCodes.OK)
            .json(
                new ApiResponse(StatusCodes.OK, result, "Service forms fetched successfully")
            );


    } catch (error) {
        throw error;
    }

});

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
            }
            ,
            {
                address: data?.address ? data?.address : null,
            }
            ,
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
    }).populate(populateData) as IServiceFormDocument[];


    if (serviceForms.length === 0 || !serviceForms) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Service form is not found")
    }

    return serviceForms;

}

const searchInResult = async (data: ISearchResult) => {
    if (!data) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Search data is missing");
    }
    let dateEnteredTransformed=data.dateEntered ? data.dateEntered.split('/').join('-') : null;
    let dateServiceTransformed=data?.dateService? data?.dateService.split("/").join("-") : null;
    let dateFirstAttemptTransformed=data?.date1Attepmt? data?.date1Attepmt.split("/").join("-"):null;
    let dateSecondAttepmtTransformed=data?.date2Attepmt? data?.date2Attepmt.split("/").join("-"):null;
    let dateThirdAttepmtTransformed=data?.date3Attepmt? data?.dateEntered?.split("/").join("-"):null;
    let dateMailingTransformed=data?.dateMailing ? data?.dateMailing?.split("/").join("-") :null;
    let populateData = ['resultOptions', 'serviceTypeOptions', 'substituteDeliveredTo'];
    const resultForms: IResultFormDocument[] = await ResultForm.find({
        $or: [
            {queryInformationLTInputDate:dateEnteredTransformed? dateEnteredTransformed : null},
            {serviceResultDateOfService:dateServiceTransformed? dateServiceTransformed : null},
            {serviceResultFirstAttemptDate:dateFirstAttemptTransformed? dateFirstAttemptTransformed : null},
            {serviceResultSecondAttemptDate:dateSecondAttepmtTransformed? dateSecondAttepmtTransformed : null},
            {serviceResultThirdAttemptDate:dateThirdAttepmtTransformed? dateThirdAttepmtTransformed : null},
            {serviceResultDateOfMailing:dateMailingTransformed? dateMailingTransformed : null},
            {serviceResultResults:data?.resultOptions ? data?.resultOptions : null},
            {serviceResultScvType:data?.serviceTypeOptions ? data?.serviceTypeOptions : null},
            {substituteDeliveredTo:data?.substituteDeliveredTo ? data?.substituteDeliveredTo : null},
            {serviceResultRecipient:data?.corpRecipient ? data?.corpRecipient : null},
            {serviceResultRecipientTitle:data?.corpRecipientTitle ? data?.corpRecipientTitle : null},         
        ]
    }).populate(populateData) as IResultFormDocument[];
    
    if (resultForms.length === 0 || !resultForms) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Result form is not found")
    }

    return resultForms;
 }


const searchInStandard = async (data:ISearchStandard) => {
    if (!data) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Search data is missing");
    }

    const serviceForms: IServiceFormDocument[] = await ServiceForm.find({
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
        throw new ApiError(StatusCodes.NOT_FOUND, "Standard Service form is not found")
    }
    return serviceForms;
 }

const checkltServiceDetail = (data: ISearchService) => {
    if (data.fullName || data.businessName || data.address || data.apt || data.city || data.zip || data.commercialDescription) {
        return true;
    }

    return false
}

export {
    search,searchInService,searchInStandard,searchInResult
} 
import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateResultForm, IUpdateResultForm } from "../interfaces/resultForm.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { IResultFormDocument, ResultForm, } from "../models/resultForm.model";
import { ApiResponse } from "../utils/ApiResponse";
import { ISearchResult } from "../interfaces/legalDelivery.interface";
import { IServiceFormDocument, ServiceForm } from "../models/serviceForm.model";

const createNewResultForm = asyncHandler(async (req: Request, res: Response,) => {

    const { queryInformationLTFullName,
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
        serviceResultDateOfNotary,
        serviceResultRecipient
    }: ICreateResultForm = req.body;

    if (!queryInformationLTFullName || !queryInformationLTIndexNo || !queryInformationLTAddress) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields");
    }

    const createNewResultForm: IResultFormDocument = await ResultForm.create({
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

    }) as IResultFormDocument;


    const isServiceExistsByJobNo: IServiceFormDocument = await ServiceForm.findOne({ jobNo: serviceResultJobNo }) as IServiceFormDocument;
    console.log("isServiceExistsByJobNo",isServiceExistsByJobNo)
    if(isServiceExistsByJobNo) {

        await ServiceForm.findOneAndUpdate(
            {
                jobNo: serviceResultJobNo
            },
            {
                $set: {
                    resultFormId: createNewResultForm._id
                }
            }
        )

        if(createNewResultForm){
            console.log('====> Inside Attaching Result Service Form');
            try {
                await ResultForm.findOneAndUpdate(
                    {
                        _id: createNewResultForm._id
                    },
                    {
                        $set: {
                            serviceFormId: isServiceExistsByJobNo._id
                        }
                    }
                );
                
            } catch (error) {
                console.log('==>Error: ',error);
                
            }
        }

    }


    if (!createNewResultForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new result form");
    }

    return res
        .status(StatusCodes.CREATED)
        .json(
            new ApiResponse(StatusCodes.CREATED, createNewResultForm, "New result form has been created")
        );

});

const updateResultForm = asyncHandler(async (req: Request, res: Response) => {

    const {
        resultFormId, queryInformationLTFullName,
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
        serviceResultDateOfNotary,
        serviceResultRecipient
    }: IUpdateResultForm = req.body;

    if (!resultFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form Id is required");
    }

    if (!queryInformationLTFullName || !queryInformationLTIndexNo || !queryInformationLTAddress) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields");
    }

    // if(typeof queryInformationLT !== "object" || typeof queryInformationStandard !== "object" || typeof serviceResults !== "object") {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data types");
    // }
    
    const isServiceExistsByJobNo: IServiceFormDocument = await ServiceForm.findOne({ jobNo: serviceResultJobNo }) as IServiceFormDocument;
    console.log("isServiceExistsByJobNo",isServiceExistsByJobNo)
    if(isServiceExistsByJobNo) {

        await ServiceForm.findOneAndUpdate(
            {
                jobNo: serviceResultJobNo
            },
            {
                $set: {
                    resultFormId: resultFormId
                }
            }
        )


    const updatedResultForm: IResultFormDocument = await ResultForm.findByIdAndUpdate(
        resultFormId,
        {
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
        },
        {
            new: true
        }
    ) as IResultFormDocument;

    if (!updatedResultForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the result form");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, updatedResultForm, "Result form has been updated")
        );
});

const deleteResultForm = asyncHandler(async (req: Request, res: Response) => {

    const { resultFormId }: { resultFormId: string } = req.body;

    if (!resultFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form Id is required");
    }

    await ResultForm.findByIdAndDelete(resultFormId);

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, {}, "Result form has been deleted")
        );

});

const getSingleResultForm = asyncHandler(async (req: Request, res: Response) => {

    const { resultFormId }: { resultFormId: string } = req.body;

    if (!resultFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form id is required");
    }

    const singleResultForm: IResultFormDocument = await ResultForm.findById(resultFormId) as IResultFormDocument;

    if (!singleResultForm) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form not found");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, singleResultForm, "Result form is found")
        );

});

const getAllResultForm = asyncHandler(async (req: Request, res: Response) => {

    const { queryInformationLTFullName,
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
        serviceResultDateOfNotary, }:
        {
            queryInformationLTFullName: string,
            queryInformationLTIndexNo: string,
            queryInformationLTAddress: string,
            queryInformationLTBusinessName: string,
            queryInformationLTInputDate: string,
            queryInformationStandardServeTo: string,
            queryInformationStandardDefendants: string,
            serviceResultInputDate: string,
            serviceResultScvType: string,
            serviceResultClientId: string,
            serviceResultJobNo: string,
            serviceResultServerId: string,
            serviceResultResults: string,
            serviceResultDateOfService: string,
            serviceResultFirstTimeOfService: string,
            serviceResultFirstAttemptDate: string,
            serviceResultSecondTimeOfService: string,
            serviceResultSecondAttemptDate: string,
            serviceResultThirdTimeOfService: string,
            serviceResultThirdAttemptDate: string,
            serviceResultlTServed: string,
            serviceResultlTNotServed: string,
            serviceResultRecipientTitle: string,
            serviceResultDoor: string,
            serviceResultDoorLocks: string,
            serviceResultEntry: string,
            serviceResultWall: string,
            serviceResultFloor: string,
            serviceResultLock: string,
            serviceResultOtherDescription: string,
            serviceResultSex: string,
            serviceResultSkinColor: string,
            serviceResultHair: string,
            serviceResultAge: string,
            serviceResultHeight: string,
            serviceResultWeight: string,
            serviceResultOtherFeatures: string,
            serviceResultDateOfMailing: string,
            serviceResultDateOfNotary: string,
        } = req.body;

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

    const allResultForms: IResultFormDocument[] = await ResultForm.find({}).populate(['serviceResultServerId']) as IResultFormDocument[];

    if (!allResultForms) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetchin all result forms")
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, allResultForms, "All results forms fetched successfully")
        );

});


// const searchInResult = async (data: IResultFormDocument) => {
    const searchInResult = async (req: Request, res: Response) => {
        try {
            const { 
                queryInformationLTFullName,
                queryInformationLTIndexNo,
                queryInformationLTAddress,
                queryInformationLTBusinessName,
                queryInformationLTInputDate 
            }: IResultFormDocument = req.body;
    
            console.log("Received data:", queryInformationLTFullName,
                queryInformationLTIndexNo,
                queryInformationLTAddress,
                queryInformationLTBusinessName,
                queryInformationLTInputDate);
            
            if (
                !queryInformationLTFullName &&
                !queryInformationLTIndexNo &&
                !queryInformationLTAddress &&
                !queryInformationLTBusinessName &&
                !queryInformationLTInputDate
            ) {
                throw new ApiError(StatusCodes.BAD_REQUEST, "Search data is missing");
            }
    
            // Transforming date fields
            const inputEnteredTransformed = queryInformationLTInputDate 
                ? queryInformationLTInputDate.split('/').join('-') 
                : null;
    
            // Dynamically building the query object
            const query: any = {};
    
            if (queryInformationLTFullName) query.queryInformationLTFullName = queryInformationLTFullName;
            if (queryInformationLTIndexNo) query.queryInformationLTIndexNo = queryInformationLTIndexNo;
            if (queryInformationLTAddress) query.queryInformationLTAddress = queryInformationLTAddress;
            if (queryInformationLTBusinessName) query.queryInformationLTBusinessName = queryInformationLTBusinessName;
            if (inputEnteredTransformed) query.queryInformationLTInputDate = inputEnteredTransformed;
    
            // Logging the query for debugging
            console.log('Query Object:', query);
    
            // Executing the query
            const resultForms: IResultFormDocument[] = await ResultForm.find(query) as IResultFormDocument[];
    
            // Handling no results found
            if (resultForms.length === 0) {
                throw new ApiError(StatusCodes.NOT_FOUND, "Result form is not found");
            }
    
            // Returning the results
            res.status(StatusCodes.OK).json(resultForms);
        } catch (error) {
            // Error handling
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred" });
            }
        }
    };
    
    


export {
    createNewResultForm,
    updateResultForm,
    deleteResultForm,
    getAllResultForm,
    getSingleResultForm,
    searchInResult
}
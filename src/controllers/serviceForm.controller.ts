import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateServiceForm, IUpdateServiceForm } from "../interfaces/serviceForm.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { IServiceFormDocument, ServiceForm } from "../models/serviceForm.model";
import { Client, IClientDocument } from "../models/client.model";
import { IServiceTypeDocument, ServiceType } from "../models/serviceType.model";
import { ILTServiceTypeDocument, LTServiceType } from "../models/lTServiceType.model";
import { IStandardServiceDocument, StandardServiceType } from "../models/standardServiceType.model";
import { ICustomRequest } from "../middlewares/auth.middleware";
import { IUserDocument } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";

const createNewServiceForm = asyncHandler(async (req: Request, res: Response) => {

    const user: IUserDocument = (req as ICustomRequest).user as IUserDocument;

    const {
        jobNo,
        inputDate,
        clientId,
        serviceType,
        caseNo,
        caption,
        lTServiceType,
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
        standardServiceType,
        oSSTIndexNo,
        oSSTDescription,
        sSDCourt,
        sSDDefendants,
        sSDPlaintiff,
        sSDCountry,
        datePairs
    }: ICreateServiceForm = req.body;

    const alreadyServiceExists: IServiceFormDocument = await ServiceForm.findOne({ jobNo }) as IServiceFormDocument;

    if (alreadyServiceExists) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Service Form with this Job no (${jobNo}) already exists`);
    }

    const client: IClientDocument = await Client.findById(clientId) as IClientDocument;
    const serviceTypeDoc: IServiceTypeDocument = await ServiceType.findById(serviceType) as IServiceTypeDocument;
    const ltServiceTypeDoc: ILTServiceTypeDocument = await LTServiceType.findById(lTServiceType) as ILTServiceTypeDocument;
    const standardServiceTypeDoc: IStandardServiceDocument = await StandardServiceType.findById(standardServiceType) as IStandardServiceDocument;

    const newServiceForm: IServiceFormDocument = await ServiceForm.create({
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

    }) as IServiceFormDocument;

    console.log("line passed 118", newServiceForm)

    if (!newServiceForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new service form");
    }

    return res
        .status(StatusCodes.CREATED)
        .json(
            new ApiResponse(StatusCodes.CREATED, newServiceForm, "New service form has been created")
        );

});

const updateServiceForm = asyncHandler(async (req: Request, res: Response) => {

    const user: IUserDocument = (req as ICustomRequest).user as IUserDocument;

    const {
        serviceFormId,
        jobNo,
        inputDate,
        clientId,
        serviceType,
        caseNo,
        caption,
        lTServiceType,
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
        standardServiceType,
        oSSTIndexNo,
        oSSTDescription,
        sSDCourt,
        sSDDefendants,
        sSDPlaintiff,
        sSDCountry,
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
        timeTrip,

    }: IUpdateServiceForm = req.body;

    if (!serviceFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form id is required.")
    }

    if (!jobNo || !inputDate || !clientId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Required fields are missing.")
    }

    const client: IClientDocument = await Client.findById(clientId) as IClientDocument;
    const serviceTypeDoc: IServiceTypeDocument = await ServiceType.findById(serviceType) as IServiceTypeDocument;
    const ltServiceTypeDoc: ILTServiceTypeDocument = await LTServiceType.findById(lTServiceType) as ILTServiceTypeDocument;
    const standardServiceTypeDoc: IStandardServiceDocument = await StandardServiceType.findById(standardServiceType) as IStandardServiceDocument;

    const updatedServiceForm: IServiceFormDocument = await ServiceForm.findByIdAndUpdate(
        serviceFormId,
        {
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
        },
        {
            new: true
        }
    ) as IServiceFormDocument;

    if (!updatedServiceForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating service form.")
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, updatedServiceForm, "Form has been updated")
        );

});

const deleteServiceForm = asyncHandler(async (req: Request, res: Response) => {

    const { serviceFormId }: { serviceFormId: string } = req.body;

    if (!serviceFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form id is required");
    }

    await ServiceForm.findByIdAndDelete(serviceFormId);

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, {}, "Service form has been deleted successfully.")
        );

});

const getSingleServiceForm = asyncHandler(async (req: Request, res: Response) => {

    const { serviceFormId }: { serviceFormId: string } = req.body;

    if (!serviceFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form id is required");
    }

    const singleServiceForm: IServiceFormDocument = await ServiceForm.findById(serviceFormId) as IServiceFormDocument;

    if (!singleServiceForm) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form not found");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, singleServiceForm, "Service form is found")
        );

});

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

const getDateRangeServiceForms = asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate, jobNo, clientId, caseNo, serviceType, lTSFirstName, lTSBusinessName,
        lTSAddress, lTSApt, lTSCity, lTSZip, oLTDescription, lTSDescription, serviceResultDateOfService,
        serviceResultFirstAttemptDate, serviceResultSecondAttemptDate, serviceResultThirdAttemptDate,
        serviceResultDateOfMailing, serviceResultRecipientTitle, substituteDeliveredTo, corporateRecipient,
        sSDDefendants, sSDPlaintiff, oSSTDescription, oSSTIndexNo, oLTIndexNo, lTSState, sSDCourt } = req.body;

    // Build query object
    let query: any = {};

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
        "jobNo", "clientId", "caseNo", "oLTIndexNo", "lTSState", "serviceType", "lTSFirstName",
        "lTSBusinessName", "lTSAddress", "lTSApt", "lTSCity", "lTSZip", "oLTDescription", "lTSDescription",
        "serviceResultDateOfService", "serviceResultFirstAttemptDate", "serviceResultSecondAttemptDate",
        "serviceResultThirdAttemptDate", "serviceResultDateOfMailing", "serviceResultRecipientTitle",
        "substituteDeliveredTo", "corporateRecipient", "sSDDefendants", "sSDPlaintiff", "oSSTDescription",
        "oSSTIndexNo", "sSDCourt"
    ];

    // Loop over all fields and apply regex matching if a value is provided
    fields.forEach((field) => {
        if (req.body[field]) {
            query[field] = { $regex: req.body[field], $options: 'i' }; // Apply regex and make it case-insensitive
        }
    });

    try {
        // Fetch data based on the query
        const allServiceForms: any[] = await ServiceForm.find(query)
            .sort({ dataField: -1 })
            .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'serviceResultServerId'])
            .exec();

        // Check if data was fetched
        if (!allServiceForms || allServiceForms.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(new ApiResponse(StatusCodes.NOT_FOUND, [], "No service forms found matching the criteria."));
        }

        return res
            .status(StatusCodes.OK)
            .json(new ApiResponse(StatusCodes.OK, allServiceForms, "Service forms fetched successfully."));
    } catch (error) {
        // Handle errors
        console.error(error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred while fetching service forms.");
    }
});



const getAllServiceForm = asyncHandler(async (req: Request, res: Response) => {

    const {
        jobNo,
        inputDate,
        clientId,
        serviceType,
    }: {
        jobNo: number,
        inputDate: string,
        clientId: string,
        serviceType: string
    } = req.body;

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

    const allServiceForms: IServiceFormDocument[] = await ServiceForm.find({})
        .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy', 'serviceResultServerId']) as IServiceFormDocument[];

    if (!allServiceForms) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all service forms");
    }

    return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, allServiceForms, "All service forms fetched successfully.")
        );

});


export {
    createNewServiceForm,
    updateServiceForm,
    deleteServiceForm,
    getAllServiceForm,
    getSingleServiceForm,
    getDateRangeServiceForms
}
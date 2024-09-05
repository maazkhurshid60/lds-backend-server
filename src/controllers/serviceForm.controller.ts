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

const createNewServiceForm = asyncHandler( async (req: Request, res: Response) => {

    const user: IUserDocument = (req as ICustomRequest).user as IUserDocument;
    
    const {
        jobNo,
        inputDate,
        clientId,
        serviceType,
        caseNo,
        caption,
        lTServiceType,
        // otherLTServiceTypeData,
        oLTIndexNo,
        oLTDescription,
        // lTServiceDetail,
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
        // otherStandardServiceTypeData,
        oSSTIndexNo,
        oSSTDescription,
        // standardServiceDetail,
        sSDCourt,
        sSDDefendants,
        sSDPlaintiff,
        sSDCountry,
        // firstNameServe,
        // addressServe,
        // cityServe,
        // stateServe,
        // aptServe,
        // zipServe
    }: ICreateServiceForm = req.body;

    // if(!jobNo || !inputDate || !clientId) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Required fields are missing")
    // }

    const alreadyServiceExists: IServiceFormDocument = await ServiceForm.findOne({ jobNo }) as IServiceFormDocument;

    if(alreadyServiceExists) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Service Form with this Job no (${jobNo}) already exists`);
    }

    const client: IClientDocument = await Client.findById(clientId) as IClientDocument;
    const serviceTypeDoc: IServiceTypeDocument = await ServiceType.findById(serviceType) as IServiceTypeDocument;
    const ltServiceTypeDoc: ILTServiceTypeDocument = await LTServiceType.findById(lTServiceType) as ILTServiceTypeDocument;
    const standardServiceTypeDoc: IStandardServiceDocument = await StandardServiceType.findById(standardServiceType) as IStandardServiceDocument;

    // if(!client || !serviceTypeDoc || !ltServiceTypeDoc || !standardServiceTypeDoc) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data has passed.");
    // }
console.log("line passed 76",jobNo,
    inputDate,
client?._id
 
     )

    const newServiceForm: IServiceFormDocument = await ServiceForm.create({
        jobNo,
        inputDate,
        clientId: client?._id ,
        serviceType: serviceTypeDoc?._id ,
        caseNo,
        caption,
        lTServiceType: ltServiceTypeDoc?._id ,
        // otherLTServiceTypeData,
        oLTIndexNo,
        oLTDescription,
        // lTServiceDetail,
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
        standardServiceType: standardServiceTypeDoc?._id ,
        // otherStandardServiceTypeData,
        oSSTIndexNo,
        oSSTDescription,
        // standardServiceDetail,
        sSDCourt,
        sSDDefendants,
        sSDPlaintiff,
        sSDCountry,
        // firstNameServe,
        // addressServe,
        // cityServe,
        // stateServe,
        // aptServe,
        // zipServe,
        serviceFormCreatedBy: user._id ,
        lastUpdatedBy: user._id 
    }) as IServiceFormDocument;

    console.log("line passed 118",newServiceForm)

    if(!newServiceForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new service form");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, newServiceForm, "New service form has been created")
    );

});

const updateServiceForm = asyncHandler( async (req: Request, res: Response) => {

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
        // otherLTServiceTypeData,
        oLTIndexNo,
        oLTDescription,
        // lTServiceDetail,
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
        // otherStandardServiceTypeData,
        oSSTIndexNo,
        oSSTDescription,
        // standardServiceDetail,
        sSDCourt,
        sSDDefendants,
        sSDPlaintiff,
        sSDCountry,
        firstNameServe,
        addressServe,
        cityServe,
        stateServe,
        aptServe,
        zipServe
    }: IUpdateServiceForm = req.body;

    if(!serviceFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form id is required.")
    }

    if(!jobNo || !inputDate || !clientId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Required fields are missing.")
    }

    const client: IClientDocument = await Client.findById(clientId) as IClientDocument;
    const serviceTypeDoc: IServiceTypeDocument = await ServiceType.findById(serviceType) as IServiceTypeDocument;
    const ltServiceTypeDoc: ILTServiceTypeDocument = await LTServiceType.findById(lTServiceType) as ILTServiceTypeDocument;
    const standardServiceTypeDoc: IStandardServiceDocument = await StandardServiceType.findById(standardServiceType) as IStandardServiceDocument;

    // if(!client || !serviceTypeDoc || !ltServiceTypeDoc ) {
    //     throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data has passed.");
    // }

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
                // otherLTServiceTypeData,
                oLTIndexNo,
                oLTDescription,
                // lTServiceDetail,
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
                // otherStandardServiceTypeData,
                oSSTIndexNo,
                oSSTDescription,
                // standardServiceDetail,
                sSDCourt,
                sSDDefendants,
                sSDPlaintiff,
                sSDCountry,
                firstNameServe,
                addressServe,
                cityServe,
                stateServe,
                aptServe,
                zipServe,
                serviceFormCreatedBy: user._id ,
                lastUpdatedBy: user._id 
            }
        },
        {
            new: true
        }
    ) as IServiceFormDocument;

    if(!updatedServiceForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating service form.")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedServiceForm, "Service form has been updated")
    );

});

const deleteServiceForm = asyncHandler( async (req: Request, res: Response) => {

    const { serviceFormId } : { serviceFormId: string } = req.body;

    if(!serviceFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form id is required");
    }

    await ServiceForm.findByIdAndDelete( serviceFormId );

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "Service form has been deleted successfully.")
    );

});

const getSingleServiceForm = asyncHandler( async (req: Request, res: Response) => {

    const { serviceFormId } : { serviceFormId: string } = req.body;

    if(!serviceFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form id is required");
    }

    const singleServiceForm: IServiceFormDocument = await ServiceForm.findById( serviceFormId ) as IServiceFormDocument;

    if(!singleServiceForm) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service form not found");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, singleServiceForm, "Service form is found")
    );

});


const getAllServiceForm = asyncHandler( async (req: Request, res: Response) => {

    const { 
        jobNo,
        inputDate,
        clientId,
        serviceType, 
    } : {
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
    .populate(['clientId', 'serviceType', 'lTServiceType', 'standardServiceType', 'serviceFormCreatedBy', 'lastUpdatedBy']) as IServiceFormDocument[];

    if(!allServiceForms) {
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
    getSingleServiceForm
}
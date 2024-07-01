import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateResultForm, IUpdateResultForm } from "../interfaces/resultForm.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { IResultFormDocument, ResultForm } from "../models/resultForm.model";
import { ApiResponse } from "../utils/ApiResponse";


const createNewResultForm = asyncHandler( async (req: Request, res: Response,) => {

    const { queryInformationLT, queryInformationStandard, serviceResults } : ICreateResultForm = req.body;

    if(!queryInformationLT || !queryInformationStandard || !serviceResults) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields");
    }

    if(typeof queryInformationLT !== "object" || typeof queryInformationStandard !== "object" || typeof serviceResults !== "object") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data types");
    }

    const createNewResultForm: IResultFormDocument = await ResultForm.create({
        queryInformationLT,
        queryInformationStandard,
        serviceResults
    }) as IResultFormDocument;

    if(!createNewResultForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new result form");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, createNewResultForm, "New result form has been created")
    );

});

const updateResultForm = asyncHandler( async (req: Request, res: Response) => {

    const { resultFormId, queryInformationLT, queryInformationStandard, serviceResults } : IUpdateResultForm = req.body;

    if(!resultFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form Id is required");
    }

    if(!queryInformationLT || !queryInformationStandard || !serviceResults) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields");
    }

    if(typeof queryInformationLT !== "object" || typeof queryInformationStandard !== "object" || typeof serviceResults !== "object") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data types");
    }

    const updatedResultForm: IResultFormDocument = await ResultForm.findByIdAndUpdate(
        resultFormId,
        {
            $set: {
                queryInformationLT,
                queryInformationStandard,
                serviceResults
            }
        },
        {
            new: true
        }
    ) as IResultFormDocument;

    if(!updatedResultForm) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while updating the result form");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedResultForm, "Result form has been updated")
    );
});

const deleteResultForm = asyncHandler( async (req: Request, res: Response) => {

    const { resultFormId } : { resultFormId: string } = req.body;

    if(!resultFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form Id is required");
    }

    await ResultForm.findByIdAndDelete( resultFormId );

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "Result form has been deleted")
    );

});

const getSingleResultForm = asyncHandler( async (req: Request, res: Response) => {

    const { resultFormId } : { resultFormId: string } = req.body;

    if(!resultFormId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form id is required");
    }

    const singleResultForm: IResultFormDocument = await ResultForm.findById( resultFormId ) as IResultFormDocument;

    if(!singleResultForm) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Result form not found");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, singleResultForm, "Result form is found")
    );

});

const getAllResultForm = asyncHandler( async (req: Request, res: Response) => {

    const { queryInformationLT, queryInformationStandard, serviceResults } : 
    { 
        queryInformationLT: any,
        queryInformationStandard: any,
        serviceResults: any
    } = req.body;

    if(!queryInformationLT || !queryInformationStandard || !serviceResults) {

        const allResultForms: IResultFormDocument[] = await ResultForm.find({
            $or: [
                {
                    queryInformationLT: {
                        $regex: queryInformationLT
                    }
                },
                {
                    queryInformationStandard: {
                        $regex: queryInformationStandard
                    }
                },
                {
                    serviceResults: {
                        $regex: serviceResults
                    }
                },
            ]
        }) as IResultFormDocument[];

        if(!allResultForms) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetchin all result forms")
        }

        return res
        .status(StatusCodes.OK)
        .json(
            new ApiResponse(StatusCodes.OK, allResultForms, "All results forms fetched successfully")
        );

    }

    const allResultForms: IResultFormDocument[] = await ResultForm.find({}) as IResultFormDocument[];

    if(!allResultForms) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetchin all result forms")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, allResultForms, "All results forms fetched successfully")
    );

});


export {
    createNewResultForm,
    updateResultForm,
    deleteResultForm,
    getAllResultForm,
    getSingleResultForm
}
import { Request, Response } from "express";
import { Role, IRoleDocument } from "../models/role.model";
import { asyncHandler } from "../utils/AsyncHandler";
import { ICreateRole, IUpdateRole } from "../interfaces/role.interface";
import { ApiError } from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";


const createRole = asyncHandler( async (req: Request, res: Response) => {

    const { name, description, isActive } : ICreateRole = req.body;

    if(
        [name, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Name and Description are required fields");
    }


    if(typeof isActive !== "boolean") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid isActive type");
    }

    const createdRole: IRoleDocument = await Role.create({
        name,
        description,
        isActive
    }) as IRoleDocument;

    if(!createRole) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating a new role.");
    }

    return res
    .status(StatusCodes.CREATED)
    .json(
        new ApiResponse(StatusCodes.CREATED, createdRole, "New role has been created")
    );

});

const updateRole = asyncHandler( async (req: Request, res: Response) => {

    const { roleId, name, description, isActive } : IUpdateRole = req.body;

    if(
        [roleId, name, description].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Name and Description are required fields");
    }

    if(typeof isActive !== "boolean") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid isActive type");
    }

    const updatedRole: IRoleDocument = await Role.findByIdAndUpdate(
        roleId,
        {
            $set: {
                name,
                description,
                isActive
            }
        },
        {
            new: true,
        }
    ) as IRoleDocument;

    if(!updatedRole) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating new role");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedRole, "Role has been updated")
    );

});

const deleteRole = asyncHandler( async (req: Request, res: Response) => {

    const { roleId } : { roleId: string } = req.body;

    if(!roleId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Role id is required");
    }

    await Role.findByIdAndDelete(
        roleId
    );

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "Role has been deleted successfully")
    );

});


const getAllAvailableRoles = asyncHandler( async (req: Request, res: Response) => {

    const allAvailableRoles: IRoleDocument[] = await Role.find({}) as IRoleDocument[];
 
    if(!allAvailableRoles) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all roles");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, allAvailableRoles, "Fetched all roles successfully!")
    );

});

const searchRole = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IRoleDocument[] = await Role.find(
        {
            $or: [
                {name: {
                    $regex: searchQuery
                }},
            ]
        }
    ) as IRoleDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No Role found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});



export {
    createRole,
    updateRole,
    deleteRole,
    getAllAvailableRoles,
    searchRole
}
import { User, IUserDocument } from "../models/user.model";
import { Role } from "../models/role.model";
import { asyncHandler } from "../utils/AsyncHandler";
import { CookieOptions, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";

import { ICustomRequest } from "../middlewares/auth.middleware"

import { checkIsUserPasswordCorrect, generateAccessToken } from "../utils/Hashing"

import {
    IRegisterUser,
    ILoginUser,
    IUpdateUserDetails
} from "../interfaces/user.interface"


const generateAccessTokens = async(userId: any) => {
    try {

        const user = await User.findById(userId);
        const userAccessToken = generateAccessToken(user);

        return userAccessToken;
        
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while generating access token.");
    }
}

const healthCheck = asyncHandler( async (req: Request, res: Response) => {

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Everthing is working fine !!!!")
    );

});

const registerNewUser = asyncHandler( async (req: Request, res: Response) => {

    const { userName, firstName, lastName, email, password, roles }: IRegisterUser = req.body;

    if(
        [userName, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    };

    if(roles.length === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Roles are empty");
    }

    if(!roles.every((role) => typeof role === "string")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Roles Type");
    }

    const existingUserWithEmail = await User.findOne({
        $or: [{ email }, { userName }]
    });

    console.log("Existing User: ", existingUserWithEmail?.userName);
    
    if(existingUserWithEmail) {
        throw new ApiError(StatusCodes.CONFLICT, "User with email or username already exists");
    }

    const rolesList: any[] = [];

    for (let i = 0; i < roles.length; i++) {
        const roleName = roles[i];
        const roleInDb = await Role.findOne({
            name: roleName
        });

        if(roleInDb) {
            rolesList.push(roleInDb._id)
        }
        
    }

    if(rolesList.length === 0) {
        throw new ApiError(StatusCodes.CONFLICT, "Invalid Roles Assign");
    }

    //Hashing user password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roles: rolesList,
    }) as IUserDocument;

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ).populate(["roles"]);

    if(!createdUser) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while creating the user");
    }

    res.status(StatusCodes.CREATED).json(
        new ApiResponse(StatusCodes.CREATED, createdUser, "User Registered Successfully!")
    );

});


const loginUser = asyncHandler( async (req: Request, res: Response) => {
    
    const { userName, password }: ILoginUser = req.body;

    if(
        [userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Username and Password are required");
    };

    const user = await User.findOne({ userName: userName }) as IUserDocument;

    if(!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User does not exists.");
    }

    if(!user.isActive) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User is deactivated");
    }

    const isPasswordvalid = await checkIsUserPasswordCorrect(user.password!, password);

    if(!isPasswordvalid) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user credentials.");
    }

    const accessToken = await generateAccessTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password").populate(["roles"]);

    const options: CookieOptions = {
        httpOnly: true,
        secure: true,
    };

    return res
    .status(StatusCodes.OK)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(StatusCodes.OK, { user: loggedInUser, accessToken }, "User logged in successfully.")
    );

});


const logoutUser = asyncHandler( async (req: Request, res: Response) => {

    const user: IUserDocument = (req as ICustomRequest).user as IUserDocument;
    const isUserExists = await User.findById(user._id);

    if(!isUserExists) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized Action");
    }

    const options: CookieOptions = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(StatusCodes.OK)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "User logout successfully")
    );

});


const updateUserDetails = asyncHandler( async (req: Request, res:Response) => {

    const { userId, userName, firstName, lastName, email }: IUpdateUserDetails = req.body;    
    
    if(
        [userId, userName,  email].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are required");
    }

    const updatedUser: IUserDocument = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                ...req.body
            }
        },
        { new: true }
    ).select("-password").populate(["roles"]) as IUserDocument;

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedUser, "User updated successfully")
    )

});


const deleteUser = asyncHandler( async (req: Request, res: Response) => {

    const { userId } : { userId: string } = req.body;

    if(!userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "UserId is required");
    }

    await User.findByIdAndDelete(userId);

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, {}, "User has been deleted successfully.")
    );

});

const getCurrentUser = asyncHandler( async (req: Request, res: Response) => {

    const user: IUserDocument = (req as ICustomRequest).user as IUserDocument;
    const isUserExists = await User.findById(user._id).select("-password").populate(['roles']);

    if(!isUserExists) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthenticated Action");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, isUserExists, "Get current user successfully.")
    );

});

const getAnyUserDetails = asyncHandler( async (req: Request, res: Response) => {

    const { userId } : { userId: string} = req.body;

    if(!userId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "UserId is required");
    }

    const user: IUserDocument = await User.findById(userId).select("-password") as IUserDocument;

    if(!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "User does not exists");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, user, `Get user Id: ${userId} details successfully.`)
    );
    
});

const updateUserRoles = asyncHandler( async (req: Request, res: Response) => {

    const { userId, roles } : { userId: string, roles: string[] } = req.body;

    if(!userId || userId?.trim() === "") {
        throw new ApiError(StatusCodes.BAD_REQUEST, "UserId is required");
    }

    if(!roles || roles?.length === 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Roles are required");
    }

    if(!roles.every((role) => typeof role === "string")) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Roles Type");
    }

    const rolesList: any[] = [];

    for (let i = 0; i < roles.length; i++) {
        const roleName = roles[i];
        const roleInDb = await Role.findOne({
            name: roleName
        });

        if(roleInDb) {
            rolesList.push(roleInDb._id)
        }
        
    }

    if(rolesList.length === 0) {
        throw new ApiError(StatusCodes.CONFLICT, "Invalid Roles Assign");
    }

    const updatedUser: IUserDocument = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                roles: rolesList
            },
        },
        {
            new: true
        }
    ).select("-password").populate(["roles"]) as IUserDocument;

    if(!updatedUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Something went wrong while updating roles.");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, updatedUser, `User id : ${userId} roles has been updated successfully.`)
    );

});

const getAllCreatedUsers = asyncHandler( async (req: Request, res: Response) => {

    const allUsers: IUserDocument[] = await User.find({}).select('-password').populate(['roles']) as IUserDocument[];

    if(!allUsers) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong while fetching all users.");
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, allUsers, "Fetched all users successfully!")
    );

});

const searchUser = asyncHandler( async (req: Request, res: Response) => {

    const { searchQuery } : { searchQuery: string } = req.body;

    if(!searchQuery) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No search query");
    }

    const searchedDocs: IUserDocument[] = await User.find(
        {
            $or: [
                {userName: {
                    $regex: searchQuery
                }},
                {firstName: {
                    $regex: searchQuery
                }},
                {lastName: {
                    $regex: searchQuery
                }},
                {email: {
                    $regex: searchQuery
                }},
            ]
        }
    ) as IUserDocument[];

    if(!searchedDocs || searchedDocs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "No User found")
    }

    return res
    .status(StatusCodes.OK)
    .json(
        new ApiResponse(StatusCodes.OK, searchedDocs, "Records found successfully")
    );

});


export {
    healthCheck,
    registerNewUser,
    loginUser,
    logoutUser,
    updateUserDetails,
    deleteUser,
    getCurrentUser,
    getAnyUserDetails,
    updateUserRoles,
    getAllCreatedUsers,
    searchUser
}
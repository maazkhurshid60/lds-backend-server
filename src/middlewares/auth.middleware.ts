import { ApiError } from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUserDocument } from "../models/user.model";
import { asyncHandler } from "../utils/AsyncHandler";
import { StatusCodes } from "http-status-codes";

interface ICustomJWTPayload extends JwtPayload {
    _id: string,
}

export interface ICustomRequest extends Request {
    user: IUserDocument
}

export const verifyJWT = asyncHandler( async (req: Request, res:Response, next: NextFunction ) => {

    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if(!token) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized Access");
        }

        const decodedToken = jwt.verify(token, "lds-secret-123875438-key");
        const userId = (decodedToken as ICustomJWTPayload)._id;
        
        const user : IUserDocument = await User.findById(userId).select("-password").populate(["roles"]) as IUserDocument;

        if(!user) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Access Token");
        }

        (req as ICustomRequest).user = user;
        next();
        
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Access Token");
    }

});
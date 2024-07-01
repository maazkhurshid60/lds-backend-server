import { asyncHandler } from "../utils/AsyncHandler";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";
import { ICustomRequest } from "./auth.middleware"

export const checkRoles = (roles: string[]) => {

    return asyncHandler( async (req: Request, res: Response, next: NextFunction) => {

        const user = (req as ICustomRequest).user;

        for (let i = 0; i < roles.length; i++) {
            const requiredRole = roles[i];

            if(user.roles.find((role) => role.name === requiredRole)){
                break;
            } else if (i < roles.length + 1) {
                i++
            } else {
                if(!user.roles.includes(roles)) {
                    throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized Access !");
                }
            }
            
        }
        next();

    }); 

}
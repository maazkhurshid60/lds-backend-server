"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
const AsyncHandler_1 = require("../utils/AsyncHandler");
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = require("../utils/ApiError");
const checkRoles = (roles) => {
    return (0, AsyncHandler_1.asyncHandler)(async (req, res, next) => {
        const user = req.user;
        for (let i = 0; i < roles.length; i++) {
            const requiredRole = roles[i];
            if (user.roles.find((role) => role.name === requiredRole)) {
                break;
            }
            else if (i < roles.length + 1) {
                i++;
            }
            else {
                if (!user.roles.includes(roles)) {
                    throw new ApiError_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized Access !");
                }
            }
        }
        next();
    });
};
exports.checkRoles = checkRoles;

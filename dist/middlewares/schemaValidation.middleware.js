"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const http_status_codes_1 = require("http-status-codes");
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }));
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages, schemaValidation: false });
            }
            else {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new ApiError_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
            }
        }
    };
}
exports.validateData = validateData;

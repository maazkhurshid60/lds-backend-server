
const asyncHandler = (requestHandler: any) => {
    return (req: any, res: any, next: any) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(res.status(error.statusCode  || 500).json(
            {
                success: false,
                message: error.message
            }
        )))
    }
}

export { asyncHandler }
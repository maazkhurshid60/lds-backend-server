
class ApiError extends Error {
    statusCode: number
    data: null
    success: boolean
    errors: never[]
    constructor(
        statusCode: number,
        message = "Something Went Wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false 
        this.errors = errors

        if(stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }
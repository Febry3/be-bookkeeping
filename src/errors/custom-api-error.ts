import { StatusCodes } from "http-status-codes";

class CustomApiError extends Error {
    public statusCode: StatusCodes;
    constructor(message: string, statusCode: StatusCodes) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomApiError.prototype);
    }
}

export default CustomApiError;
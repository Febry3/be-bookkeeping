
import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api-error";

class BadRequest extends CustomApiError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
}

export default BadRequest;

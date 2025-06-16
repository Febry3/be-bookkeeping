import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api-error";

class NotFound extends CustomApiError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

export default NotFound;
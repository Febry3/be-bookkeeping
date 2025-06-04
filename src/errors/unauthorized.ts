import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api-error";

class Unauthorized extends CustomApiError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

export default Unauthorized;
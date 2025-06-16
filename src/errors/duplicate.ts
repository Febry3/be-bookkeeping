import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api-error";

class Duplicate extends CustomApiError {
    constructor(message: string) {
        super(message, StatusCodes.CONFLICT);
    }
}

export default Duplicate;
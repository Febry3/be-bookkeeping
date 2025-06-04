import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomApiError from '../errors/custom-api-error';
interface customError {
    statusCode: StatusCodes,
    message: string
}

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
    let customError: customError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message
    }

    if (err instanceof CustomApiError) {
        customError.message = err.message;
        customError.statusCode = err.statusCode;
    }

    res.status(customError.statusCode).json(
        {
            status: false,
            message: customError.message
        }
    );
};

export default errorHandlerMiddleware;
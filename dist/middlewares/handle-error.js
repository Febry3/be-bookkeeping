"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const custom_api_error_1 = __importDefault(require("../errors/custom-api-error"));
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message
    };
    if (err instanceof custom_api_error_1.default) {
        customError.message = err.message;
        customError.statusCode = err.statusCode;
    }
    res.status(customError.statusCode).json({
        status: false,
        message: customError.message
    });
};
exports.default = errorHandlerMiddleware;

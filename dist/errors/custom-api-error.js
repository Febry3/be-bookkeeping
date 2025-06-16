"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomApiError.prototype);
    }
}
exports.default = CustomApiError;

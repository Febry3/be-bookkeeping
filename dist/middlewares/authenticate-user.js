"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized_1 = __importDefault(require("../errors/unauthorized"));
const user_token_1 = __importDefault(require("../utils/user-token"));
class AuthenticateUser {
    authenticateUser(req, res, next) {
        try {
            const header = req.headers.authorization;
            let token;
            if (header === null || header === void 0 ? void 0 : header.startsWith('Bearer')) {
                token = header.split(' ')[1];
            }
            if (!token)
                throw new unauthorized_1.default('User has invalid token');
            const payload = user_token_1.default.isTokenValid(token);
            req.user = {
                name: payload.name,
                email: payload.email,
                role: payload.role,
                userId: payload.userId
            };
            next();
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }
}
exports.default = new AuthenticateUser;

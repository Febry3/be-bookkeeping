"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class UserToken {
    generateJwt(payload) {
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtKey, { expiresIn: "24h" });
        return token;
    }
    isTokenValid(token) {
        return jsonwebtoken_1.default.verify(token, config_1.default.jwtKey);
    }
}
exports.default = new UserToken;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_1 = __importDefault(require("../../errors/bad-request"));
const user_1 = require("../../model/user");
const unauthorized_1 = __importDefault(require("../../errors/unauthorized"));
const user_token_1 = __importDefault(require("../../utils/user-token"));
const duplicate_1 = __importDefault(require("../../errors/duplicate"));
const sequelize_1 = require("sequelize");
class AuthService {
    login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password)
                throw new bad_request_1.default("Please provide email or password");
            const user = yield user_1.User.findOne({ where: { email: email } });
            if (!user)
                throw new unauthorized_1.default("Email didn't match any record");
            const isPasswordValid = yield user.comparePassword(password);
            if (!isPasswordValid)
                throw new unauthorized_1.default("Wrong password");
            const token = user_token_1.default.generateJwt({ name: user.name, email: user.email, userId: user.id, role: user.role });
            return token;
        });
    }
    register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role } = req.body;
                const result = yield user_1.User.create({ name, email, password, role });
                return result;
            }
            catch (e) {
                if (e instanceof sequelize_1.ValidationError) {
                    throw new duplicate_1.default("Duplicate email, please choose another email");
                }
                throw new Error(e);
            }
        });
    }
}
exports.default = new AuthService;

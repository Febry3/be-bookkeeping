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
const http_status_codes_1 = require("http-status-codes");
const income_service_1 = __importDefault(require("./income.service"));
class IncomeController {
    getAllIncomes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("asdadds");
                const { type, filter } = req.query;
                const result = yield income_service_1.default.getIncome(type, filter);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Data fetched",
                    data: result
                });
            }
            catch (err) {
                console.error(err);
                next(err);
            }
        });
    }
    createIncome(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, amount, description } = req.body;
                const { userId } = req.user;
                const income = yield income_service_1.default.createIncome(type, amount, description, userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Data Created",
                    data: income
                });
            }
            catch (e) {
                console.error(e);
                next(e);
            }
        });
    }
    updateIncome(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { type, amount, description } = req.body;
                const { userId } = req.user;
                const income = yield income_service_1.default.updateIncome(parseInt(id), type, amount, description, userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Data Updated",
                    data: income
                });
            }
            catch (e) {
                console.error(e);
                next(e);
            }
        });
    }
    deleteIncome(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId } = req.user;
                const income = yield income_service_1.default.deleteIncome(parseInt(id), userId);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Data Deleted",
                    data: income
                });
            }
            catch (e) {
                console.error(e);
                next(e);
            }
        });
    }
}
exports.default = new IncomeController;

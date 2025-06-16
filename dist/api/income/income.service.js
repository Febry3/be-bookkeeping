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
const income_1 = require("../../model/income");
const sequelize_1 = require("sequelize");
const not_found_1 = __importDefault(require("../../errors/not-found"));
class IncomeService {
    getIncome(filter, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let endDate = "";
            if (filter === "weekly") {
                endDate = "DATE_SUB(NOW(), INTERVAL 1 WEEK)";
            }
            else if (filter === "monthly") {
                endDate = "DATE_SUB(NOW(), INTERVAL 1 MONTH)";
            }
            else if (filter === "yearly") {
                endDate = "DATE_SUB(NOW(), INTERVAL 12 MONTH)";
            }
            const whereConditions = {};
            if (type) {
                whereConditions.type = type;
            }
            if (endDate !== "") {
                whereConditions.createdAt = {
                    [sequelize_1.Op.lte]: (0, sequelize_1.literal)("NOW()"),
                    [sequelize_1.Op.gte]: (0, sequelize_1.literal)(endDate),
                };
            }
            const incomes = yield income_1.Income.findAll({
                where: whereConditions,
                order: [['createdAt', 'DESC']]
            });
            let totalMainIncome = 0;
            let totalSideIncome = 0;
            let totalAllIncome = 0;
            for (const income of incomes) {
                if (income.type.toLowerCase() === "main") {
                    totalMainIncome += income.amount;
                }
                if (income.type.toLowerCase() === "side") {
                    totalSideIncome += income.amount;
                }
                totalAllIncome += income.amount;
            }
            return {
                totalMainIncome,
                totalSideIncome,
                totalAllIncome,
                incomes
            };
        });
    }
    createIncome(type, amount, description, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = income_1.Income.create({ type: type, amount: amount, description: description, userId: userId });
            return income;
        });
    }
    updateIncome(id, type, amount, description, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = yield income_1.Income.findOne({
                where: {
                    incomeId: id,
                    userId: userId
                }
            });
            if (!income)
                throw new not_found_1.default(`There is no income with id: ${id}`);
            const result = income.update({
                type, amount, description
            });
            return result;
        });
    }
    deleteIncome(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = yield income_1.Income.findOne({
                where: {
                    incomeId: id,
                    userId: userId
                }
            });
            if (!income)
                throw new not_found_1.default(`There is no income with id: ${id}`);
            income.destroy();
        });
    }
}
exports.default = new IncomeService;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const income_controller_1 = __importDefault(require("./income.controller"));
const authenticate_user_1 = __importDefault(require("../../middlewares/authenticate-user"));
const { router } = (0, express_1.default)();
exports.router = router;
router.get('/income', authenticate_user_1.default.authenticateUser, income_controller_1.default.getAllIncomes);
router.post('/income', authenticate_user_1.default.authenticateUser, income_controller_1.default.createIncome);
router.put('/income/:id', authenticate_user_1.default.authenticateUser, income_controller_1.default.updateIncome);
router.delete('/income/:id', authenticate_user_1.default.authenticateUser, income_controller_1.default.deleteIncome);

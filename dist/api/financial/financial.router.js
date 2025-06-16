"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const financial_controller_1 = __importDefault(require("./financial.controller"));
// Menggunakan path middleware seperti pada contoh Anda
const authenticate_user_1 = __importDefault(require("../../middlewares/authenticate-user"));
const router = express_1.default.Router();
exports.router = router;
// Middleware tidak lagi diterapkan secara global di sini, melainkan pada tiap rute.
// router.use(authenticateUser.authenticateUser as RequestHandler); // Baris ini dihapus
// Middleware 'authenticateUser' ditambahkan ke setiap endpoint secara manual
router.get('/financials', authenticate_user_1.default.authenticateUser, financial_controller_1.default.getAllFinancials);
router.post('/financials/asset', authenticate_user_1.default.authenticateUser, financial_controller_1.default.createAsset);
router.get('/financials/asset/:id', authenticate_user_1.default.authenticateUser, financial_controller_1.default.getAssetById);
router.patch('/financials/asset/:id', authenticate_user_1.default.authenticateUser, financial_controller_1.default.updateAsset);
router.delete('/financials/asset/:id', authenticate_user_1.default.authenticateUser, financial_controller_1.default.deleteAsset);
router.post('/financials/liability', authenticate_user_1.default.authenticateUser, financial_controller_1.default.createLiability);

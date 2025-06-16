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
const financial_service_1 = __importDefault(require("./financial.service"));
class FinancialController {
    // Method untuk membuat Aset baru
    createAsset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield financial_service_1.default.createAsset(req);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: true,
                    message: "Asset created successfully",
                    data: result
                });
            }
            catch (err) {
                // Jika ada error, teruskan ke middleware error handler
                next(err);
            }
        });
    }
    // Method untuk membuat Liabilitas baru
    createLiability(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield financial_service_1.default.createLiability(req);
                return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: true,
                    message: "Liability created successfully",
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // Method untuk mengambil semua data keuangan (aset & liabilitas)
    getAllFinancials(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield financial_service_1.default.getAllFinancials(req);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Financial records fetched successfully",
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // Method untuk mengambil satu Aset berdasarkan ID
    getAssetById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield financial_service_1.default.getAssetById(req);
                // Jika service mengembalikan null, berarti data tidak ditemukan
                if (!result) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        status: false,
                        message: `Asset with id ${req.params.id} not found`,
                        data: null
                    });
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Asset fetched successfully",
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // Method untuk memperbarui Aset berdasarkan ID
    updateAsset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield financial_service_1.default.updateAsset(req);
                // Jika service mengembalikan null, berarti data tidak ditemukan
                if (!result) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        status: false,
                        message: `Asset with id ${req.params.id} not found`,
                        data: null
                    });
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Asset updated successfully",
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // Method untuk menghapus Aset berdasarkan ID
    deleteAsset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield financial_service_1.default.deleteAsset(req);
                // Jika hasil destroy adalah 0, berarti tidak ada data yang dihapus
                if (result === 0) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                        status: false,
                        message: `Asset with id ${req.params.id} not found`,
                        data: null
                    });
                }
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: "Asset deleted successfully",
                    data: null
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new FinancialController();

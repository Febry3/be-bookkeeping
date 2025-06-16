"use strict";
// financial/financial.service.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const asset_1 = require("../../model/asset"); // Sesuaikan path jika perlu
const liability_1 = require("../../model/liability"); // Sesuaikan path jika perlu
// import NotFoundError from "../../errors/not-found"; // DIHAPUS
class FinancialService {
    /**
     * Membuat catatan Aset baru untuk pengguna yang sedang login.
     */
    createAsset(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { assetType, assetCategory, amount } = req.body;
            const { userId } = req.body.user;
            const asset = yield asset_1.Asset.create({
                assetType,
                assetCategory,
                amount,
                userId
            });
            return asset;
        });
    }
    /**
     * Membuat catatan Liabilitas baru untuk pengguna yang sedang login.
     */
    createLiability(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { liabilityType, liabilityCategory, amount } = req.body;
            const { userId } = req.body.user;
            const liability = yield liability_1.Liability.create({
                liabilityType,
                liabilityCategory,
                amount,
                userId
            });
            return liability;
        });
    }
    /**
     * Mengambil semua data Aset & Liabilitas milik pengguna.
     */
    getAllFinancials(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body.user;
            const [assets, liabilities] = yield Promise.all([
                asset_1.Asset.findAll({ where: { userId } }),
                liability_1.Liability.findAll({ where: { userId } })
            ]);
            return { assets, liabilities };
        });
    }
    /**
     * Mengambil satu data Aset berdasarkan ID.
     */
    getAssetById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req.body.user;
            const asset = yield asset_1.Asset.findOne({ where: { assetId: id, userId } });
            // PERUBAHAN: Kembalikan asset atau null, jangan throw error
            return asset;
        });
    }
    /**
     * Mengupdate satu data Aset berdasarkan ID.
     */
    updateAsset(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req.body.user;
            const { amount, assetCategory } = req.body;
            const asset = yield asset_1.Asset.findOne({ where: { assetId: id, userId } });
            // PERUBAHAN: Jika tidak ditemukan, kembalikan null
            if (!asset) {
                return null;
            }
            asset.amount = amount !== null && amount !== void 0 ? amount : asset.amount;
            asset.assetCategory = assetCategory !== null && assetCategory !== void 0 ? assetCategory : asset.assetCategory;
            yield asset.save();
            return asset;
        });
    }
    /**
     * Menghapus satu data Aset berdasarkan ID.
     */
    deleteAsset(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req.body.user;
            const result = yield asset_1.Asset.destroy({ where: { assetId: id, userId } });
            // PERUBAHAN: Kembalikan jumlah baris yang dihapus (0 jika tidak ada)
            return result;
        });
    }
}
exports.default = new FinancialService();

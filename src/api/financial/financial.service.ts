// financial/financial.service.ts

import { Request } from "express";
import { Asset } from "../../model/asset"; // Sesuaikan path jika perlu
import { Liability } from "../../model/liability"; // Sesuaikan path jika perlu
// import NotFoundError from "../../errors/not-found"; // DIHAPUS

class FinancialService {
    /**
     * Membuat catatan Aset baru untuk pengguna yang sedang login.
     */
    public async createAsset(req: Request) {
        const { assetType, assetCategory, amount } = req.body;
        const { userId } = req.body.user;

        const asset = await Asset.create({
            assetType,
            assetCategory,
            amount,
            userId
        });

        return asset;
    }

    /**
     * Membuat catatan Liabilitas baru untuk pengguna yang sedang login.
     */
    public async createLiability(req: Request) {
        const { liabilityType, liabilityCategory, amount } = req.body;
        const { userId } = req.body.user;

        const liability = await Liability.create({
            liabilityType,
            liabilityCategory,
            amount,
            userId
        });

        return liability;
    }

    /**
     * Mengambil semua data Aset & Liabilitas milik pengguna.
     */
    public async getAllFinancials(req: Request) {
        const { userId } = req.body.user;

        const [assets, liabilities] = await Promise.all([
            Asset.findAll({ where: { userId } }),
            Liability.findAll({ where: { userId } })
        ]);

        return { assets, liabilities };
    }

    /**
     * Mengambil satu data Aset berdasarkan ID.
     */
    public async getAssetById(req: Request) {
        const { id } = req.params;
        const { userId } = req.body.user;

        const asset = await Asset.findOne({ where: { assetId: id, userId } });
        // PERUBAHAN: Kembalikan asset atau null, jangan throw error
        return asset;
    }
    
    /**
     * Mengupdate satu data Aset berdasarkan ID.
     */
    public async updateAsset(req: Request) {
        const { id } = req.params;
        const { userId } = req.body.user;
        const { amount, assetCategory } = req.body;

        const asset = await Asset.findOne({ where: { assetId: id, userId } });
        // PERUBAHAN: Jika tidak ditemukan, kembalikan null
        if (!asset) {
            return null;
        }

        asset.amount = amount ?? asset.amount;
        asset.assetCategory = assetCategory ?? asset.assetCategory;
        
        await asset.save();
        return asset;
    }
    
    /**
     * Menghapus satu data Aset berdasarkan ID.
     */
    public async deleteAsset(req: Request) {
        const { id } = req.params;
        const { userId } = req.body.user;

        const result = await Asset.destroy({ where: { assetId: id, userId } });
        // PERUBAHAN: Kembalikan jumlah baris yang dihapus (0 jika tidak ada)
        return result;
    }
}

export default new FinancialService();
import { Asset } from "../../model/asset";
import { Liability } from "../../model/liability";
import { Equity } from "../../model/equity";
import NotFound from "../../errors/not-found"; // Pastikan Anda punya error class ini

// --- Tipe data untuk Aset ---
interface CreateAssetData {
    assetType: string;
    assetCategory: string;
    amount: number;
    description: string;
    createdAt?: Date;
}
interface UpdateAssetData {
    assetType?: string;
    assetCategory?: string;
    amount?: number;
    description?: string;
    createdAt?: Date;
}

// --- Tipe data untuk Ekuitas ---
interface CreateEquityData {
    equityType: string;
    amount: number;
    description: string;
    createdAt: Date;
}
interface UpdateEquityData {
    equityType?: string;
    amount?: number;
    description?: string;
    createdAt?: Date;
}

// --- Tipe data untuk Liabilitas ---
interface CreateLiabilityData {
    liabilityType: string;
    liabilityCategory: string;
    amount: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
interface UpdateLiabilityData {
    liabilityType?: string;
    liabilityCategory?: string;
    amount?: number;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


class FinancialService {

    // =============================================
    // =================== ASSET ===================
    // =============================================

    async createAsset(data: CreateAssetData, userId: number): Promise<Asset> {
        const asset = await Asset.create({
            assetType: data.assetType,
            assetCategory: data.assetCategory,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            userId: userId,
        });
        return asset;
    }

    async getAllAssets(userId: number): Promise<Asset[]> {
        return await Asset.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    }

    async getAssetById(id: number, userId: number): Promise<Asset | null> {
        return await Asset.findOne({ where: { assetId: id, userId } });
    }

    async updateAsset(id: number, data: UpdateAssetData, userId: number): Promise<Asset> {
        const asset = await Asset.findOne({ where: { assetId: id, userId } });
        if (!asset) {
            throw new NotFound(`Aset dengan ID: ${id} tidak ditemukan.`);
        }
        asset.assetType = data.assetType ?? asset.assetType;
        asset.assetCategory = data.assetCategory ?? asset.assetCategory;
        asset.amount = data.amount ?? asset.amount;
        asset.description = data.description ?? asset.description;
        if (data.createdAt) asset.setDataValue('createdAt', data.createdAt);

        await asset.save();
        return asset;
    }

    async deleteAsset(id: number, userId: number): Promise<number> {
        const result = await Asset.destroy({ where: { assetId: id, userId } });
        if (result === 0) {
            throw new NotFound(`Aset dengan ID: ${id} tidak ditemukan.`);
        }
        return result;
    }


    // =============================================
    // =================== EQUITY ==================
    // =============================================

    async createEquity(data: CreateEquityData, userId: number): Promise<Equity> {
        const equity = await Equity.create({
            equityType: data.equityType,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            userId: userId,
        });
        return equity;
    }

    async getAllEquities(userId: number): Promise<Equity[]> {
        return await Equity.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    }

    async getEquityById(id: number, userId: number): Promise<Equity | null> {
        return await Equity.findOne({ where: { equityId: id, userId } });
    }

    async updateEquity(id: number, data: UpdateEquityData, userId: number): Promise<Equity> {
        const equity = await Equity.findOne({ where: { equityId: id, userId } });
        if (!equity) {
            throw new NotFound(`Equity dengan ID: ${id} tidak ditemukan.`);
        }
        equity.equityType = data.equityType ?? equity.equityType;
        equity.amount = data.amount ?? equity.amount;
        equity.description = data.description ?? equity.description;
        if (data.createdAt) equity.setDataValue('createdAt', data.createdAt);

        await equity.save();
        return equity;
    }

    async deleteEquity(id: number, userId: number): Promise<number> {
        const result = await Equity.destroy({ where: { equityId: id, userId } });
        if (result === 0) {
            throw new NotFound(`Equity dengan ID: ${id} tidak ditemukan.`);
        }
        return result;
    }


    // =============================================
    // ================= LIABILITY =================
    // =============================================

    async createLiability(data: CreateLiabilityData, userId: number): Promise<Liability> {
        const liability = await Liability.create({
            liabilityType: data.liabilityType,
            liabilityCategory: data.liabilityCategory,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            userId: userId,
        });
        return liability;
    }

    async getAllLiabilities(userId: number): Promise<Liability[]> {
        return await Liability.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    }

    async getLiabilityById(id: number, userId: number): Promise<Liability | null> {
        return await Liability.findOne({ where: { liabilityId: id, userId } });
    }

    async updateLiability(id: number, data: UpdateLiabilityData, userId: number): Promise<Liability> {
        const liability = await Liability.findOne({ where: { liabilityId: id, userId } });
        if (!liability) {
            throw new NotFound(`Liability dengan ID: ${id} tidak ditemukan.`);
        }
        liability.liabilityType = data.liabilityType ?? liability.liabilityType;
        liability.liabilityCategory = data.liabilityCategory ?? liability.liabilityCategory;
        liability.amount = data.amount ?? liability.amount;
        liability.description = data.description ?? liability.description;
        if (data.createdAt) liability.setDataValue('createdAt', data.createdAt);
        if (data.updatedAt) liability.setDataValue('updatedAt', data.updatedAt);

        await liability.save();
        return liability;
    }

    async deleteLiability(id: number, userId: number): Promise<number> {
        const result = await Liability.destroy({ where: { liabilityId: id, userId } });
        if (result === 0) {
            throw new NotFound(`Liability dengan ID: ${id} tidak ditemukan.`);
        }
        return result;
    }
}

export default new FinancialService();
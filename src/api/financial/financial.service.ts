import { Asset } from "../../model/asset";
import { Liability } from "../../model/liability";
import { Equity } from "../../model/equity";
import NotFound from "../../errors/not-found";
import BadRequest from "../../errors/bad-request"; // Pastikan Anda punya error class ini
import { User } from "../../model";

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
    dueDate?: Date;
}
interface UpdateLiabilityData {
    liabilityType?: string;
    liabilityCategory?: string;
    amount?: number;
    description?: string;
    createdAt?: Date;
    dueDate?: Date;
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
        return await Asset.findAll({ where: { userId }, order: [['createdAt', 'DESC']], include: { model: User, as: "user" } });
    }

    async getAssetById(id: number, userId: number): Promise<Asset | null> {
        return await Asset.findOne({ where: { assetId: id, userId }, include: { model: User, as: "user" } });
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

    // =============================================
    async createLiability(data: CreateLiabilityData, userId: number): Promise<Liability> {
        if (data.dueDate) {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

            if (data.liabilityType.toLowerCase() === 'long-term' && new Date(data.dueDate) < oneYearFromNow) {
                throw new BadRequest("Jatuh tempo untuk liabilitas jangka panjang harus lebih dari 1 tahun.");
            }
            if (data.liabilityType.toLowerCase() === 'short-term' && new Date(data.dueDate) > oneYearFromNow) {
                throw new BadRequest("Jatuh tempo untuk liabilitas jangka pendek harus kurang dari 1 tahun.");
            }
        }

        const liability = await Liability.create({
            liabilityType: data.liabilityType,
            liabilityCategory: data.liabilityCategory,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            dueDate: data.dueDate,
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

        const typeToCheck = data.liabilityType ?? liability.liabilityType;
        const dateToCheck = data.dueDate ?? liability.dueDate;

        if (dateToCheck) {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

            if (typeToCheck.toLowerCase() === 'long-term' && new Date(dateToCheck) < oneYearFromNow) {
                throw new BadRequest("Jatuh tempo untuk liabilitas jangka panjang harus lebih dari 1 tahun.");
            }
            if (typeToCheck.toLowerCase() === 'short-term' && new Date(dateToCheck) > oneYearFromNow) {
                throw new BadRequest("Jatuh tempo untuk liabilitas jangka pendek harus kurang dari 1 tahun.");
            }
        }

        liability.liabilityType = data.liabilityType ?? liability.liabilityType;
        liability.liabilityCategory = data.liabilityCategory ?? liability.liabilityCategory;
        liability.amount = data.amount ?? liability.amount;
        liability.description = data.description ?? liability.description;
        if (data.createdAt) liability.setDataValue('createdAt', data.createdAt);
        if (data.dueDate) liability.setDataValue('dueDate', data.dueDate);

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
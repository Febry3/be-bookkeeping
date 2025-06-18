// financial/financial.service.ts

import { Liability, LiabilityAttributes } from "../../model/liability";
import { Equity, EquityAttributes } from "../../model/equity";
import NotFound from "../../errors/not-found"; // Pastikan Anda punya error class ini

// --- Tipe data untuk mempermudah ---
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


class FinancialService {
    // ===== LIABILITY =====

    async createLiability(data: CreateLiabilityData, userId: number): Promise<Liability> {
        const liability = await Liability.create({
            liabilityType: data.liabilityType,
            liabilityCategory: data.liabilityCategory,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            userId: userId, // userId dari parameter
        });
        return liability;
    }

    async getAllLiabilities(userId: number): Promise<Liability[]> {
        return await Liability.findAll({ where: { userId } });
    }

    async getLiabilityById(id: number, userId: number): Promise<Liability | null> {
        return await Liability.findOne({ where: { liabilityId: id, userId } });
    }

    async updateLiability(id: number, data: UpdateLiabilityData, userId: number): Promise<Liability> {
        const liability = await Liability.findOne({ where: { liabilityId: id, userId } });

        if (!liability) {
            throw new NotFound(`Liability dengan ID: ${id} tidak ditemukan untuk pengguna ini.`);
        }

        // Gunakan data dari parameter untuk update
        liability.liabilityType = data.liabilityType ?? liability.liabilityType;
        liability.liabilityCategory = data.liabilityCategory ?? liability.liabilityCategory;
        liability.amount = data.amount ?? liability.amount;
        liability.description = data.description ?? liability.description;
        liability.createdAt = data.createdAt ?? liability.createdAt;
        liability.updatedAt = data.updatedAt ?? liability.updatedAt;

        await liability.save();
        return liability;
    }

    async deleteLiability(id: number, userId: number): Promise<number> {
        const result = await Liability.destroy({ where: { liabilityId: id, userId } });
        if (result === 0) {
            throw new NotFound(`Liability dengan ID: ${id} tidak ditemukan untuk pengguna ini.`);
        }
        return result;
    }

    // ===== EQUITY =====

    async createEquity(data: CreateEquityData, userId: number): Promise<Equity> {
        const equity = await Equity.create({
            equityType: data.equityType,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            userId: userId, // userId dari parameter
        });
        return equity;
    }

    async getAllEquities(userId: number): Promise<Equity[]> {
        return await Equity.findAll({ where: { userId } });
    }

    async getEquityById(id: number, userId: number): Promise<Equity | null> {
        return await Equity.findOne({ where: { equityId: id, userId } });
    }

    async updateEquity(id: number, data: UpdateEquityData, userId: number): Promise<Equity> {
        const equity = await Equity.findOne({ where: { equityId: id, userId } });

        if (!equity) {
            throw new NotFound(`Equity dengan ID: ${id} tidak ditemukan untuk pengguna ini.`);
        }

        equity.equityType = data.equityType ?? equity.equityType;
        equity.amount = data.amount ?? equity.amount;
        equity.description = data.description ?? equity.description;
        equity.createdAt = data.createdAt ?? equity.createdAt;

        await equity.save();
        return equity;
    }

    async deleteEquity(id: number, userId: number): Promise<number> {
        const result = await Equity.destroy({ where: { equityId: id, userId } });
        if (result === 0) {
            throw new NotFound(`Equity dengan ID: ${id} tidak ditemukan untuk pengguna ini.`);
        }
        return result;
    }
}

export default new FinancialService();
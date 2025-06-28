import BadRequest from "../../errors/bad-request";
import NotFound from "../../errors/not-found";
import { Liability, User } from "../../model";

class LiabilityService {
    public async getAllLiability(userId: number) {
        const liabilities = await Liability.findAll({ where: { userId: userId }, include: { model: User, as: "user" }, order: [['createdAt', 'DESC']], includeConversion: true } as any);
        return liabilities;
    }

    public async getLiabilityById(liabilityId: number, userId: number) {
        const liabilities = await Liability.findOne({ where: { userId: userId }, include: { model: User, as: "user" }, order: [['createdAt', 'DESC']] });
        return liabilities;
    }

    public async createLiability(userId: number, liabilityType: string, liabilityCategory: string, amount: number, description: string, createdAt: Date, dueDate?: Date) {
        if (dueDate) {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

            if (liabilityType.toLowerCase() === 'long-term' && new Date(dueDate) < oneYearFromNow) {
                throw new BadRequest("Jatuh tempo untuk liabilitas jangka panjang harus lebih dari 1 tahun.");
            }
            if (liabilityType.toLowerCase() === 'short-term' && new Date(dueDate) > oneYearFromNow) {
                throw new BadRequest("Jatuh tempo untuk liabilitas jangka pendek harus kurang dari 1 tahun.");
            }
        }

        const liability = await Liability.create({
            userId: userId,
            liabilityType: liabilityType,
            liabilityCategory: liabilityCategory,
            amount: amount,
            description: description,
            createdAt: createdAt,
            dueDate: dueDate,
        });

        return liability;
    }

    public async updateLiability(liabilityId: number, userId: number, liabilityType: string, liabilityCategory: string, amount: number, description: string, createdAt: Date, dueDate?: Date): Promise<Liability> {
        const liability = await Liability.findOne({ where: { liabilityId: liabilityId, userId }, include: { model: User, as: "user" } });
        if (!liability) {
            throw new NotFound(`Liability dengan ID: ${userId} tidak ditemukan.`);
        }

        const typeToCheck = liabilityType ?? liability.liabilityType;
        const dateToCheck = dueDate ?? liability.dueDate;

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

        liability.liabilityType = liabilityType ?? liability.liabilityType;
        liability.liabilityCategory = liabilityCategory ?? liability.liabilityCategory;
        liability.amount = amount ?? liability.amount;
        liability.description = description ?? liability.description;
        if (createdAt) liability.setDataValue('createdAt', createdAt);
        if (dueDate) liability.setDataValue('dueDate', dueDate);

        await liability.save();
        return liability;
    }

    public async deleteLiability(liabilityId: number, userId: number): Promise<void> {
        const liability = await Liability.findOne({ where: { userId: userId, liabilityId: liabilityId } });
        if (!liability) throw new NotFound(`There are no spend data with id: ${liabilityId} or userId: ${userId}`);
        liability.destroy();
    }
}

export default new LiabilityService;
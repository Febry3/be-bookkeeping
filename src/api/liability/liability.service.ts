import NotFound from "../../errors/not-found";
import { Liability } from "../../model";

class LiabilityService {
    public async getAllLiability(userId: number) {
        const liabilities = await Liability.findAll({ where: { userId: userId } });
        return liabilities;
    }

    public async createLiability(userId: number, liabilityType: string, liabilityCategory: string, amount: number, description: string) {
        const liability = await Liability.create({
            userId: userId,
            liabilityType: liabilityType,
            liabilityCategory: liabilityCategory,
            amount: amount,
            description: description
        });

        return liability;
    }

    public async updateLiability(liabilityId: number, userId: number, liabilityType: string, liabilityCategory: string, amount: number, description: string): Promise<Liability> {
        const liability = await Liability.findOne({ where: { userId: userId, liabilityId: liabilityId } });
        if (!liability) throw new NotFound(`There are no spend data with id: ${liabilityId} or userId: ${userId}`);
        const result = liability.update({
            liabilityType: liabilityType,
            liabilityCategory: liabilityCategory,
            amount: amount,
            description: description
        });

        return result;
    }

    public async deleteLiability(liabilityId: number, userId: number): Promise<void> {
        const liability = await Liability.findOne({ where: { userId: userId, liabilityId: liabilityId } });
        if (!liability) throw new NotFound(`There are no spend data with id: ${liabilityId} or userId: ${userId}`);
        liability.destroy();
    }
}

export default new LiabilityService;
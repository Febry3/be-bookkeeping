import NotFound from "../../errors/not-found";
import { Equity, User } from "../../model";

class EquityService {
    public async getAllEquity(userId: number) {
        const equities = await Equity.findAll({ where: { userId: userId }, include: { model: User, as: "user" }, order: [['createdAt', 'DESC']], includeConversion: true } as any);
        return equities;
    }

    async getEquityById(id: number, userId: number): Promise<Equity | null> {
        return await Equity.findOne({ where: { equityId: id, userId } });
    }

    public async createEquity(userId: number, equityName: string, equityType: string, amount: number, description: string, createdAt: Date) {
        const equities = await Equity.create({
            equityName: equityName,
            equityType: equityType,
            amount: amount,
            description: description,
            userId: userId,
            createdAt: createdAt
        });
        return equities;
    }

    public async updateEquity(equityId: number, userId: number, equityName: string, equityType: string, amount: number, description: string, createdAt: Date) {
        const equity = await Equity.findOne({ where: { equityId: equityId, userId: userId } });
        if (!equity) throw new NotFound(`There are no spend data with id: ${equityId} or userId: ${userId}`);
        equity.equityType = equityType ?? equity.equityType;
        equity.amount = amount ?? equity.amount;
        equity.description = description ?? equity.description;
        equity.equityName = equityName ?? equity.equityName;
        if (createdAt) equity.setDataValue('createdAt', createdAt);

        await equity.save();
        return equity;
    }

    public async deleteEquity(equityId: number, userId: number) {
        const equity = await Equity.findOne({ where: { equityId: equityId, userId: userId } });
        if (!equity) throw new NotFound(`There are no spend data with id: ${equityId} or userId: ${userId}`);
        equity.destroy();
    }
}

export default new EquityService;
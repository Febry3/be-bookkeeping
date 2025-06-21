import NotFound from "../../errors/not-found";
import { Equity, User } from "../../model";

class EquityService {
    public async getAllEquity(userId: number) {
        const equities = await Equity.findAll({ where: { userId: userId }, include: { model: User, as: "user" } });
        return equities;
    }

    public async createEquity(userId: number, equityType: string, amount: number, description: string) {
        const equities = await Equity.create({
            equityType: equityType,
            amount: amount,
            description: description,
            userId: userId
        });
        return equities;
    }

    public async updateEquity(equityId: number, userId: number, equityType: string, amount: number, description: string) {
        const equity = await Equity.findOne({ where: { equityId: equityId, userId: userId } });
        if (!equity) throw new NotFound(`There are no spend data with id: ${equityId} or userId: ${userId}`);
        equity.update({
            equityType: equityType,
            amount: amount,
            description: description
        });
    }

    public async deleteEquity(equityId: number, userId: number) {
        const equity = await Equity.findOne({ where: { equityId: equityId, userId: userId } });
        if (!equity) throw new NotFound(`There are no spend data with id: ${equityId} or userId: ${userId}`);
        equity.destroy();
    }
}

export default new EquityService;
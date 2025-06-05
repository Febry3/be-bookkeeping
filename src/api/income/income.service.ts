import { Request } from "express";
import { Income, IncomeAttributes } from "../../model/income";
import { User } from "../../model/user";
import { WhereOptions } from "sequelize";

class IncomeService {
    public async createIncome(req: Request): Promise<IncomeAttributes> {
        const { type, amount } = req.body;
        const income = Income.create({ type, amount });
        return income;
    }

    public async getIncome(whereConditions: WhereOptions<IncomeAttributes>): Promise<IncomeAttributes[]> {
        return await Income.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']]
        });
    }
}

export default new IncomeService;
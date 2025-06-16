import { Request } from "express";
import { Income, IncomeAttributes } from "../../model/income";
import { User } from "../../model/user";
import { WhereOptions } from "sequelize";
import NotFound from "../../errors/not-found";

class IncomeService {
    public async getIncome(whereConditions: WhereOptions<IncomeAttributes>): Promise<IncomeAttributes[]> {
        return await Income.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']]
        });
    }

    public async createIncome(req: Request): Promise<IncomeAttributes> {
        const { type, amount, description } = req.body;
        const income = Income.create({ type, amount, description });
        return income;
    }

    public async updateIncome(req: Request): Promise<IncomeAttributes> {
        const { id } = req.params;
        const { type, amount, description } = req.body;
        const income = await Income.findOne({
            where: {
                incomeId: id
            }
        });

        if (!income) throw new NotFound(`There is no income with id: ${id}`);

        const result = income.update({
            type, amount, description
        });

        return result;
    }


    public async deleteIncome(req: Request): Promise<void> {
        const { id } = req.params;
        const income = await Income.findOne({
            where: {
                incomeId: id
            }
        });

        if (!income) throw new NotFound(`There is no income with id: ${id}`);

        income.destroy();
    }
}

export default new IncomeService;
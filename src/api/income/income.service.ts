import { Request } from "express";
import { Income, IncomeAttributes } from "../../model/income";
import { literal, Op, Sequelize, WhereOptions } from "sequelize";
import NotFound from "../../errors/not-found";
import { Spend } from "../../model/spend";

class IncomeService {
    public async getIncome(filter: string, type: string) {
        let endDate: string = "";

        if (filter === "weekly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 WEEK)";
        } else if (filter === "monthly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 MONTH)";
        } else if (filter === "yearly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 12 MONTH)";
        }

        const whereConditions: WhereOptions<IncomeAttributes> = {};

        if (type) {
            whereConditions.type = type as string;
        }

        if (endDate !== "") {
            whereConditions.createdAt = {
                [Op.lte]: literal("NOW()"),
                [Op.gte]: literal(endDate),
            };
        }

        const incomes = await Income.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']]
        });

        let totalMainIncome = 0;
        let totalSideIncome = 0;
        let totalAllIncome = 0;

        for (const income of incomes) {
            if (income.type.toLowerCase() === "main") {
                totalMainIncome += income.amount;
            }

            if (income.type.toLowerCase() === "side") {
                totalSideIncome += income.amount;
            }
            totalAllIncome += income.amount;
        }

        return {
            totalMainIncome,
            totalSideIncome,
            totalAllIncome,
            incomes
        };
    }

    public async createIncome(type: string, amount: number, description: string, userId: number): Promise<IncomeAttributes> {
        const income = Income.create({ type: type, amount: amount, description: description, userId: userId });
        return income;
    }

    public async updateIncome(id: number, type: string, amount: number, description: string, userId: number): Promise<IncomeAttributes> {
        const income = await Income.findOne({
            where: {
                incomeId: id,
                userId: userId
            }
        });

        if (!income) throw new NotFound(`There is no income with id: ${id}`);

        const result = income.update({
            type, amount, description
        });

        return result;
    }


    public async deleteIncome(id: number, userId: number): Promise<void> {
        const income = await Income.findOne({
            where: {
                incomeId: id,
                userId: userId
            }
        });

        if (!income) throw new NotFound(`There is no income with id: ${id}`);
        income.destroy();
    }

    //getting cogs, gross profit, ebit (earning before tax)
    public async getIncomeInformation(userId: number) {
        //cogs (cost of goods sold)
        const stockExpenses = await Spend.sum("amount", {
            where: {
                userId: userId,
                spendingType: "stock"
            }
        })

        const incomes = await Income.sum("amount", {
            where: {
                userId: userId
            }
        });

        const allExpenses = await Spend.sum("amount", {
            where: {
                userId: userId,
            }
        })

        const grossProfit = incomes - stockExpenses;
        const ebit = grossProfit - allExpenses;
        const taxRate = 0.1;
        const netProfit = (1 - taxRate) * ebit;

        return { stockExpenses, incomes, allExpenses, grossProfit, ebit, taxRate, netProfit };
    }
}

export default new IncomeService;
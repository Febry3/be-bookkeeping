import { literal, Op, WhereOptions } from "sequelize";
import { Spend, SpendAttributes } from "../../model/spend";
import NotFound from "../../errors/not-found";

class SpendService {
    public async getAllSpending(type: string, filter: string) {
        let endDate: string = "";

        if (filter === "weekly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 WEEK)";
        } else if (filter === "monthly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 MONTH)";
        } else if (filter === "yearly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 12 MONTH)";
        }

        const whereConditions: WhereOptions<SpendAttributes> = {};

        if (type) {
            whereConditions.spendingType = type as string;
        }

        if (endDate !== "") {
            whereConditions.createdAt = {
                [Op.lte]: literal("NOW()"),
                [Op.gte]: literal(endDate),
            };
        }

        const spends = await Spend.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']]
        });

        //COGS (Cost of Goods Sold)
        let totalStockSpending: number = 0;
        let totalAllSpending: number = 0;

        //for now its alright if the data arent too much ehehe (consider to use direct query to db to sum up the amount)
        for (const spend of spends) {
            if (spend.spendingType.toLowerCase() === "stock") {
                totalStockSpending += spend.amount
            }
            totalAllSpending += spend.amount;
        }

        return {
            totalStockSpending: totalStockSpending,
            totalAllSpending: totalAllSpending,
            spends: spends,
        }
    }

    public async createSpend(spendingType: string, amount: number, description: string, userId: number) {
        const spend = Spend.create({
            spendingType: spendingType, amount: amount, description: description, userId: userId,
        });

        return spend;
    }

    public async updateSpend(id: number, userId: number, spendingType: string, amount: number, description: string) {
        const spend = await Spend.findOne({ where: { spendId: id, userId: userId } });
        if (!spend) throw new NotFound(`There are no spend data with id: ${id} or userId: ${userId}`);
        spend.update({
            spendingType: spendingType,
            amount: amount,
            description: description
        });
    }

    public async deleteSpend(id: number, userId: number) {
        const spend = await Spend.findOne({ where: { spendId: id, userId: userId } });
        if (!spend) throw new NotFound(`There are no spend data with id: ${id} or userId: ${userId}`);
        spend.destroy();
    }
}

export default new SpendService;
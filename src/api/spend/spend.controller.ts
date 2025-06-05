import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { literal, Op, WhereOptions } from "sequelize";
import { Spend, SpendAttributes } from "../../model/spend";

class SpendController {
    public async getAllSpends(req: Request, res: Response, next: NextFunction) {
        try {
            let { type, filter } = req.query;

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

            //COGS
            let totalStockSpending = 0;
            let totalAllSpending = 0;

            for (const spend of spends) {
                if (spend.spendingType.toLowerCase() === "stock") {
                    totalStockSpending += spend.amount;
                }
                totalAllSpending += spend.amount;
            }
            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data fetched",
                data: {
                    totalStockSpending: totalStockSpending,
                    totalAllSpending: totalAllSpending,
                    spends: spends,
                }
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new SpendController;
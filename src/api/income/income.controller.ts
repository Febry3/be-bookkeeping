import { NextFunction, Request, Response } from "express";
import { Income, IncomeAttributes } from "../../model/income";
import { StatusCodes } from "http-status-codes";
import { Op, WhereOptions, literal, where } from "sequelize";
import incomeService from "./income.service";

class IncomeController {
    public async getAllIncomes(req: Request, res: Response, next: NextFunction) {
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

            const incomes = await incomeService.getIncome(whereConditions);


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
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data fetched",
                data: {
                    totalMainIncome: totalMainIncome,
                    totalSideIncome: totalSideIncome,
                    totalAllIncome: totalAllIncome,
                    incomes: incomes,
                }
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

export default new IncomeController;
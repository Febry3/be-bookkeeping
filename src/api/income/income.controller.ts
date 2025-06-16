import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import incomeService from "./income.service";

class IncomeController {
    public async getAllIncomes(req: Request, res: Response, next: NextFunction) {
        try {
            const { type, filter } = req.query;

            const result = await incomeService.getIncome(type as string, filter as string);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data fetched",
                data: result
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    public async createIncome(req: Request, res: Response, next: NextFunction) {
        try {
            const { type, amount, description } = req.body;
            const { userId } = req.user!;
            const income = await incomeService.createIncome(type, amount, description, userId);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data Created",
                data: income
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public async updateIncome(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { type, amount, description } = req.body;
            const { userId } = req.user!;

            const income = await incomeService.updateIncome(parseInt(id), type, amount, description, userId);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data Updated",
                data: income
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public async deleteIncome(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = req.user!;
            const income = await incomeService.deleteIncome(parseInt(id), userId);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data Deleted",
                data: income
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public async getIncomeInformation(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user!;
            const data = await incomeService.getIncomeInformation(userId);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data Fetched",
                data: data
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}

export default new IncomeController;
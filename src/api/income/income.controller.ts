import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import incomeService from "./income.service";

class IncomeController {
    public async getAllIncomes(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { type, filter } = req.query;
            
            // Memanggil service dengan userId
            const result = await incomeService.getIncome(userId, type as string, filter as string);

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
            const { userId } = (req as any).user;
            // Menambahkan 'incomeDate' dari body
            const { type, amount, description, incomeDate } = req.body;
            
            const data = {
                type,
                amount,
                description,
                createdAt: incomeDate // Mapping tanggal manual
            };

            const income = await incomeService.createIncome(data, userId);

            return res.status(StatusCodes.CREATED).json({
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
            const { userId } = (req as any).user;
            // Menambahkan 'incomeDate' dari body
            const { type, amount, description, incomeDate } = req.body;

            const dataToUpdate = {
                type,
                amount,
                description,
                createdAt: incomeDate // Mapping tanggal manual
            };

            const income = await incomeService.updateIncome(parseInt(id), dataToUpdate, userId);

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
            const { userId } = (req as any).user;
            await incomeService.deleteIncome(parseInt(id), userId);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data Deleted",
                data: null
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public async getIncomeInformation(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
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
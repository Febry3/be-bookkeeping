import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import spendService from "./spend.service";

class SpendController {
    public async getAllSpends(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { type, filter } = req.query;

            // Memanggil service dengan userId
            const result = await spendService.getAllSpending(userId, type as string, filter as string);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data fetched",
                data: result
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    public async createSpend(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { spendingType, amount, description, spendDate, quantity } = req.body;

            const data = {
                spendingType,
                amount,
                description,
                quantity,
                createdAt: spendDate // Mapping tanggal manual
            };

            const spend = await spendService.createSpend(data, userId);

            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data Created",
                data: spend
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    public async updateSpend(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            // Menambahkan 'spendDate' dari body
            const { spendingType, amount, description, spendDate, quantity } = req.body;

            const dataToUpdate = {
                spendingType,
                amount,
                description,
                quantity,
                createdAt: spendDate
            };

            const spend = await spendService.updateSpend(parseInt(id), dataToUpdate, userId);

            return res.status(StatusCodes.OK).json({ // Status OK (200) lebih cocok untuk update
                status: true,
                message: "Data Updated",
                data: spend
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    public async deleteSpend(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = (req as any).user;
            await spendService.deleteSpend(parseInt(id), userId);

            return res.status(StatusCodes.OK).json({ // Status OK (200) lebih cocok untuk delete
                status: true,
                message: "Data Deleted",
                data: null
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

export default new SpendController;
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import spendService from "./spend.service";

class SpendController {
    public async getAllSpends(req: Request, res: Response, next: NextFunction) {
        try {
            const { type, filter } = req.query;
            const result = await spendService.getAllSpending(type as string, filter as string);
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
            const { spendingType, amount, description } = req.body;
            const { userId } = req.user!;
            const spend = await spendService.createSpend(spendingType, amount, description, userId);

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
            const { spendingType, amount, description } = req.body;
            const { userId } = req.user!;
            const { id } = req.params;
            const spend = await spendService.updateSpend(parseInt(id), userId, spendingType, amount, description);

            return res.status(StatusCodes.CREATED).json({
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
            const { userId } = req.user!;
            const spend = await spendService.deleteSpend(parseInt(id), userId);

            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data Deleted"
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

export default new SpendController;
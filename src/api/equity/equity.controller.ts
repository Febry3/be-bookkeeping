import { NextFunction, Request, Response } from "express";
import equityService from "./equity.service";
import { StatusCodes } from "http-status-codes";

class EquityController {
    public async getAllEquities(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user!;
            const result = await equityService.getAllEquity(userId);
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

    public async createEquity(req: Request, res: Response, next: NextFunction) {
        try {
            const { equityType, amount, description, equityDate } = req.body;
            const { userId } = req.user!;
            const spend = await equityService.createEquity(userId, equityType, amount, description, equityDate);

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
            const { spendingType, amount, description, equityDate } = req.body;
            const { userId } = req.user!;
            const { equityId } = req.params;
            const equity = await equityService.updateEquity(parseInt(equityId), userId, spendingType, amount, description, equityDate);

            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data Updated",
                data: equity
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    public async deleteSpend(req: Request, res: Response, next: NextFunction) {
        try {
            const { equityId } = req.params;
            const { userId } = req.user!;
            const equity = await equityService.deleteEquity(parseInt(equityId), userId);

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

export default new EquityController;
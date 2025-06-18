import { NextFunction, Request, Response } from "express";
import balanceSheetService from "./balance-sheet.service";
import { StatusCodes } from "http-status-codes";

class BalanceSheetController {
    public async getBalanceSheetData(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user!;
            const liabilities = await balanceSheetService.getBalanceSheetData(userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data fetched",
                data: liabilities
            });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

export default new BalanceSheetController;
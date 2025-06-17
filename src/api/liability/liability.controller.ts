import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import liabilityService from "./liability.service";

class LiabilityController {
    public async getAllLiability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user!;
            const data = await liabilityService.getAllLiability(userId);

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


    public async createLiability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user!;
            const { liabilityType, liabilityCategory, amount, description } = req.body;
            const data = await liabilityService.createLiability(userId, liabilityType, liabilityCategory, amount, description);

            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data Created",
                data: data
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }


    public async updateLiability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user!;
            const { liabilityId } = req.params;
            const { liabilityType, liabilityCategory, amount, description } = req.body;
            const data = await liabilityService.updateLiability(parseInt(liabilityId), userId, liabilityType, liabilityCategory, amount, description);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data Updated",
                data: data
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }


    public async deleteLiability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.user!;
            const { liabilityId } = req.params;
            const data = await liabilityService.deleteLiability(parseInt(liabilityId), userId);

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data Deleted",
                data: data
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}

export default new LiabilityController;
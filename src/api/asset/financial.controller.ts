import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import assetService from "./asset.service";

class FinancialController {
    public async createAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { assetName, assetCategory, assetValue, assetType, assetDate, assetDescription } = req.body;

            const data = {
                assetName: assetName,
                assetCategory: assetCategory,
                amount: assetValue,
                assetType: assetType,
                createdAt: assetDate,
                description: assetDescription
            };

            const newAsset = await assetService.createAsset(data, userId);
            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data aset berhasil dibuat",
                data: newAsset
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async getAllAssets(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const allAssets = await assetService.getAllAssets(userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Semua data aset berhasil diambil",
                data: allAssets
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async getAssetById(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const asset = await assetService.getAssetById(Number(id), userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data aset berhasil ditemukan",
                data: asset
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async updateAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const { assetName, assetCategory, assetValue, assetType, assetDate, assetDescription } = req.body;

            const dataToUpdate = {
                assetName: assetName,
                assetCategory: assetCategory,
                amount: assetValue,
                assetType: assetType,
                createdAt: assetDate,
                description: assetDescription
            };

            const updatedAsset = await assetService.updateAsset(Number(id), dataToUpdate, userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data aset berhasil diperbarui",
                data: updatedAsset
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async deleteAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            await assetService.deleteAsset(Number(id), userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data aset berhasil dihapus",
                data: null
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}


export default new FinancialController();
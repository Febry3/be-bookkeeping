import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import financialService from "./financial.service";

class FinancialController {

    // =============================================
    // ========= KONTROLER UNTUK ASET (ASSET) ======
    // =============================================

    public async createAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { assetName, assetValue, assetType, assetDate, assetDescription } = req.body;

            const data = {
                assetCategory: assetName,
                amount: assetValue,
                assetType: assetType,
                createdAt: assetDate,
                description: assetDescription
            };

            const newAsset = await financialService.createAsset(data, userId);
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
            const allAssets = await financialService.getAllAssets(userId);
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
            const asset = await financialService.getAssetById(Number(id), userId);
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
            const { assetName, assetValue, assetType, assetDate, assetDescription } = req.body;

            const dataToUpdate = {
                assetCategory: assetName,
                amount: assetValue,
                assetType: assetType,
                createdAt: assetDate,
                description: assetDescription
            };

            const updatedAsset = await financialService.updateAsset(Number(id), dataToUpdate, userId);
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
            await financialService.deleteAsset(Number(id), userId);
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
    

    // =============================================
    // ========= KONTROLER UNTUK EKUITAS (EQUITY) ==
    // =============================================

    public async createEquity(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { equityType, equityValue, equityDescription, equityDate } = req.body;

            const data = {
                equityType: equityType,
                amount: equityValue,
                description: equityDescription,
                createdAt: equityDate
            };
            
            const newEquity = await financialService.createEquity(data, userId);
            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data ekuitas berhasil dibuat",
                data: newEquity
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async getAllEquities(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const allEquities = await financialService.getAllEquities(userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Semua data ekuitas berhasil diambil",
                data: allEquities
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async getEquityById(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const equity = await financialService.getEquityById(Number(id), userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data ekuitas berhasil ditemukan",
                data: equity
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async updateEquity(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const { equityType, equityValue, equityDescription, equityDate } = req.body;
            
            const dataToUpdate = {
                equityType: equityType,
                amount: equityValue,
                description: equityDescription,
                createdAt: equityDate
            };

            const updatedEquity = await financialService.updateEquity(Number(id), dataToUpdate, userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data ekuitas berhasil diperbarui",
                data: updatedEquity
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async deleteEquity(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            await financialService.deleteEquity(Number(id), userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data ekuitas berhasil dihapus",
                data: null
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    
    // =============================================
    // ======= KONTROLER UNTUK LIABILITAS (LIABILITY)
    // =============================================

    public async createLiability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { liabilityName, liabilityValue, liabilityDate, liabilityDueDate, lender, paymentStatus } = req.body;
            
            const data = {
                liabilityType: liabilityName,
                liabilityCategory: lender,
                amount: liabilityValue,
                description: paymentStatus,
                createdAt: liabilityDate,
                updatedAt: liabilityDueDate
            };

            const newLiability = await financialService.createLiability(data, userId);
            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Data liabilitas berhasil dibuat",
                data: newLiability
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async getAllLiabilities(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const allLiabilities = await financialService.getAllLiabilities(userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Semua data liabilitas berhasil diambil",
                data: allLiabilities
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    
    public async getLiabilityById(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const liability = await financialService.getLiabilityById(Number(id), userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data liabilitas berhasil ditemukan",
                data: liability
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async updateLiability(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            const { liabilityName, liabilityValue, liabilityDate, liabilityDueDate, lender, paymentStatus } = req.body;

            const dataToUpdate = {
                liabilityType: liabilityName,
                liabilityCategory: lender,
                amount: liabilityValue,
                description: paymentStatus,
                createdAt: liabilityDate,
                updatedAt: liabilityDueDate
            };

            const updatedLiability = await financialService.updateLiability(Number(id), dataToUpdate, userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data liabilitas berhasil diperbarui",
                data: updatedLiability
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }

    public async deleteLiability(req: Request, res: Response, next: NextFunction) {
         try {
            const { userId } = (req as any).user;
            const { id } = req.params;
            await financialService.deleteLiability(Number(id), userId);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Data liabilitas berhasil dihapus",
                data: null
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
}

export default new FinancialController();
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import financialService from "./financial.service";

class FinancialController {

    // Method untuk membuat Aset baru
    public async createAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await financialService.createAsset(req);
            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Asset created successfully",
                data: result
            });
        } catch (err) {
            // Jika ada error, teruskan ke middleware error handler
            next(err);
        }
    }
    
    // Method untuk membuat Liabilitas baru
    public async createLiability(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await financialService.createLiability(req);
            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Liability created successfully",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    // Method untuk mengambil semua data keuangan (aset & liabilitas)
    public async getAllFinancials(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await financialService.getAllFinancials(req);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Financial records fetched successfully",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    // Method untuk mengambil satu Aset berdasarkan ID
    public async getAssetById(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await financialService.getAssetById(req);

            // Jika service mengembalikan null, berarti data tidak ditemukan
            if (!result) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    status: false,
                    message: `Asset with id ${req.params.id} not found`,
                    data: null
                });
            }

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Asset fetched successfully",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    // Method untuk memperbarui Aset berdasarkan ID
    public async updateAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await financialService.updateAsset(req);

            // Jika service mengembalikan null, berarti data tidak ditemukan
            if (!result) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    status: false,
                    message: `Asset with id ${req.params.id} not found`,
                    data: null
                });
            }

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Asset updated successfully",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }
    
    // Method untuk menghapus Aset berdasarkan ID
    public async deleteAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await financialService.deleteAsset(req);

            // Jika hasil destroy adalah 0, berarti tidak ada data yang dihapus
            if (result === 0) {
                 return res.status(StatusCodes.NOT_FOUND).json({
                    status: false,
                    message: `Asset with id ${req.params.id} not found`,
                    data: null
                });
            }

            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Asset deleted successfully",
                data: null
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new FinancialController();
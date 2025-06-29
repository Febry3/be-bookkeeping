import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authService from "./auth.service";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await authService.register(req);
            return res.status(StatusCodes.CREATED).json({
                status: true,
                message: "Registration Success",
                data: result
            });
        } catch (err) {
            next(err);
        }
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await authService.login(req);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Login Success",
                token: token
            });
        } catch (err) {
            next(err);
        }
    }

    public async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, email } = req.user!;
            const user = await authService.getProfile(userId, email);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Fetch Sucess",
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    public async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, role, language, currency } = req.body;
            const { userId } = req.user!;
            const user = await authService.updateProfile(userId, name, email, role, language, currency);
            return res.status(StatusCodes.OK).json({
                status: true,
                message: "Update Success",
                data: user
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new AuthController;
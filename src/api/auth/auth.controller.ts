import { NextFunction, Request, Response } from "express";
import { User } from "../../model/user";
import { StatusCodes } from "http-status-codes";
import authService from "./auth.service";

class AuthController {
    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password, role } = req.body;

            const result = await User.create({ name, email, password, role });

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
}

export default new AuthController;
import { NextFunction, Request, Response } from "express";
import Unauthorized from "../errors/unauthorized";
import userToken, { IPayload } from "../utils/user-token";

class AuthenticateUser {
    public authenticateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const header = req.headers.authorization;
            let token;
            if (header?.startsWith('Bearer')) {
                token = header.split(' ')[1];
            }
            if (!token) throw new Unauthorized('User has invalid token');

            const payload = userToken.isTokenValid(token) as IPayload;
            req.body = {};
            req.body.user = {
                name: payload.name,
                email: payload.email,
                role: payload.role,
                userId: payload.userId
            }
            console.log(req.body.user);
            next();
        } catch (err) {
            next(err);
        }
    }
}


export default new AuthenticateUser;
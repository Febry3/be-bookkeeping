import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config/config";

export interface IPayload {
    name: string,
    email: string,
    role: string,
    userId: number,
    language: string,
    currency: string,
}

class UserToken {
    public generateJwt(payload: any): string {
        const token = jwt.sign(payload, config.jwtKey, { expiresIn: "1w" });
        return token;
    }

    public isTokenValid(token: string): JwtPayload | string {
        return jwt.verify(token, config.jwtKey);
    }
}

export default new UserToken;
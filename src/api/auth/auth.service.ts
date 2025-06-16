import { Request } from "express";
import BadRequest from "../../errors/bad-request";
import { User } from "../../model/user";
import Unauthorized from "../../errors/unauthorized";
import userToken from "../../utils/user-token";
import Duplicate from "../../errors/duplicate";
import { ValidationError } from "sequelize";


class AuthService {
    public async login(req: Request): Promise<string> {
        const { email, password } = req.body;

        if (!email || !password) throw new BadRequest("Please provide email or password");
        const user = await User.findOne({ where: { email: email } });

        if (!user) throw new Unauthorized("Email didn't match any record");
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) throw new Unauthorized("Wrong password");
        const token = userToken.generateJwt({ name: user.name, email: user.email, userId: user.id, role: user.role });

        return token;
    }

    public async register(req: Request): Promise<any> {
        try {
            const { name, email, password, role } = req.body;
            const result = await User.create({ name, email, password, role });

            return result;
        } catch (e: any) {
            if (e instanceof ValidationError) {
                throw new Duplicate("Duplicate email, please choose another email");
            }
            throw new Error(e as string);
        }

    }
}

export default new AuthService;
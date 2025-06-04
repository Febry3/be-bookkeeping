import { Request } from "express";
import BadRequest from "../../errors/bad-request";
import { User } from "../../model/user";
import Unauthorized from "../../errors/unauthorized";
import userToken from "../../utils/user-token";

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
}

export default new AuthService;
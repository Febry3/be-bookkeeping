import { Request } from "express";
import { Income, IncomeAttributes } from "../../model/income";
import { User } from "../../model/user";

class IncomeService {
    public async createIncome(req: Request): Promise<IncomeAttributes> {
        const { type, amount } = req.body;
        const income = Income.create({ type, amount });
        return income;
    }

    public async getIncome(req: Request): Promise<IncomeAttributes[]> {
        return [];
    }
}
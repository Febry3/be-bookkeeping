import { literal, Op, WhereOptions } from "sequelize";
import { Income, IncomeAttributes } from "../../model/income";
import NotFound from "../../errors/not-found";
import { Spend } from "../../model/spend";
import { User } from "../../model";

// Tipe data untuk Income
interface CreateIncomeData {
    type: string;
    amount: number;
    description: string;
    incomeTax: number;
    createdAt?: Date;
}

interface UpdateIncomeData {
    type?: string;
    amount?: number;
    description?: string;
    incomeTax: number;
    createdAt?: Date;
}


class IncomeService {
    // --- FUNGSI INI DIPERBAIKI SECARA TOTAL ---
    public async getIncome(userId: number, type: string, filter: string) {
        let endDate: string = "";

        if (filter === "weekly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 WEEK)";
        } else if (filter === "monthly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 MONTH)";
        } else if (filter === "yearly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 12 MONTH)";
        }

        // PERBAIKAN PENTING: Menambahkan filter userId
        const whereConditions: WhereOptions<IncomeAttributes> = {
            userId: userId
        };

        if (type) {
            whereConditions.type = type as string;
        }

        if (endDate !== "") {
            whereConditions.createdAt = {
                [Op.lte]: literal("NOW()"),
                [Op.gte]: literal(endDate),
            };
        }

        const incomes = await Income.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']],
            include: {
                model: User,
                as: "user"
            },
            includeConversion: true
        } as any);

        let totalMainIncome = 0;
        let totalSideIncome = 0;
        let totalAllIncome = 0;

        for (const income of incomes) {
            if (income.type.toLowerCase() === "main") {
                totalMainIncome += income.dataValues.convertedAmount!;
            }
            if (income.type.toLowerCase() === "side") {
                totalSideIncome += income.dataValues.convertedAmount!;
            }
            totalAllIncome += income.dataValues.convertedAmount!;
        }

        return {
            totalMainIncome,
            totalSideIncome,
            totalAllIncome,
            incomes
        };
    }

    public async createIncome(data: CreateIncomeData, userId: number): Promise<Income> {
        const income = await Income.create({
            type: data.type,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            incomeTax: data.incomeTax,
            userId: userId
        });
        return income;
    }

    public async updateIncome(id: number, data: UpdateIncomeData, userId: number): Promise<Income> {
        const income = await Income.findOne({
            where: { incomeId: id, userId: userId }
        });

        if (!income) {
            throw new NotFound(`Tidak ada data pendapatan dengan id: ${id}`);
        }

        income.type = data.type ?? income.type;
        income.amount = data.amount ?? income.amount;
        income.description = data.description ?? income.description;
        income.incomeTax = data.incomeTax ?? income.incomeTax;
        if (data.createdAt) income.setDataValue('createdAt', data.createdAt);

        await income.save();
        return income;
    }

    public async deleteIncome(id: number, userId: number): Promise<void> {
        const income = await Income.findOne({
            where: { incomeId: id, userId: userId }
        });

        if (!income) {
            throw new NotFound(`Tidak ada data pendapatan dengan id: ${id}`);
        }
        await income.destroy();
    }

    public async getIncomeInformation(userId: number) {
        // Handle kasus jika nilai sum adalah null (tidak ada data)
        const stockExpenses = await Spend.sum("amount", {
            where: { userId: userId, spendingType: "stock" }
        }) || 0;

        const incomes = await Income.sum("amount", {
            where: { userId: userId }
        }) || 0;

        const allExpenses = await Spend.sum("amount", {
            where: { userId: userId }
        }) || 0;

        const grossProfit = incomes - stockExpenses;
        const ebit = grossProfit - allExpenses;
        const taxRate = 0.1;
        const netProfit = (1 - taxRate) * ebit;

        return { stockExpenses, incomes, allExpenses, grossProfit, ebit, taxRate, netProfit };
    }
}

export default new IncomeService;
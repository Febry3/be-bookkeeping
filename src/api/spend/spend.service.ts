import { literal, Op, WhereOptions } from "sequelize";
import { Spend, SpendAttributes } from "../../model/spend";
import NotFound from "../../errors/not-found";
import { User } from "../../model";

// Tipe data untuk Spend
interface CreateSpendData {
    spendingType: string;
    amount: number;
    description: string;
    quantity: number;
    createdAt?: Date;
}

interface UpdateSpendData {
    spendingType?: string;
    amount?: number;
    description?: string;
    quantity?: number;
    createdAt?: Date;
}


class SpendService {
    // --- FUNGSI INI DIPERBAIKI SECARA TOTAL ---
    public async getAllSpending(userId: number, type: string, filter: string) {
        let endDate: string = "";

        if (filter === "weekly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 WEEK)";
        } else if (filter === "monthly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 1 MONTH)";
        } else if (filter === "yearly") {
            endDate = "DATE_SUB(NOW(), INTERVAL 12 MONTH)";
        }

        // PERBAIKAN PENTING: Menambahkan filter userId
        const whereConditions: WhereOptions<SpendAttributes> = {
            userId: userId,
        };

        if (type) {
            whereConditions.spendingType = type as string;
        }

        if (endDate !== "") {
            whereConditions.createdAt = {
                [Op.lte]: literal("NOW()"),
                [Op.gte]: literal(endDate),
            };
        }

        const spends = await Spend.findAll({
            where: whereConditions,
            order: [['createdAt', 'DESC']],
            include: {
                model: User,
                as: "user"
            },
            includeConversion: true
        } as any);

        let totalStockSpending: number = 0;
        let totalAllSpending: number = 0;

        for (const spend of spends) {
            if (spend.spendingType.toLowerCase() === "stock") {
                totalStockSpending += spend.dataValues.convertedAmount!;
            }
            totalAllSpending += spend.dataValues.convertedAmount!;
        }

        return {
            totalStockSpending: totalStockSpending,
            totalAllSpending: totalAllSpending,
            spends: spends,
        }
    }

    public async createSpend(data: CreateSpendData, userId: number): Promise<Spend> {
        const totalAmount = data.quantity * data.amount;
        console.log(data.quantity)
        const spend = await Spend.create({
            spendingType: data.spendingType,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            quantity: data.quantity,
            userId: userId,
            totalAmount: totalAmount
        });
        return spend;
    }

    public async updateSpend(id: number, data: UpdateSpendData, userId: number): Promise<Spend> {
        const spend = await Spend.findOne({ where: { spendId: id, userId: userId } });
        if (!spend) {
            throw new NotFound(`Tidak ada data pengeluaran dengan id: ${id}`);
        }

        spend.spendingType = data.spendingType ?? spend.spendingType;
        spend.amount = data.amount ?? spend.amount;
        spend.description = data.description ?? spend.description;
        spend.quantity = data.quantity ?? spend.quantity;
        spend.totalAmount = spend.amount * spend.quantity;
        if (data.createdAt) spend.setDataValue('createdAt', data.createdAt);

        await spend.save();
        return spend;
    }

    public async deleteSpend(id: number, userId: number): Promise<void> {
        const spend = await Spend.findOne({ where: { spendId: id, userId: userId } });
        if (!spend) {
            throw new NotFound(`Tidak ada data pengeluaran dengan id: ${id}`);
        }
        await spend.destroy();
    }
}

export default new SpendService;
import { Op, Sequelize, where } from "sequelize";
import { Asset, Equity, Liability, User } from "../../model";

class BalanceSheetService {
    public async getBalanceSheetData(userId: number, startDate?: string, endDate?: string) {
        console.log(startDate, endDate)

        const whereClause: any = {
            userId: userId
        };

        if (startDate && endDate) {
            whereClause.createdAt = {
                [Op.between]: [startDate, endDate]
            };
        }

        const liabilitesData = await Liability.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],
                [
                    Sequelize.fn(
                        'JSON_ARRAYAGG',
                        Sequelize.fn('JSON_OBJECT',
                            'liabilityId', Sequelize.col('liabilityId'),
                            'liabilityType', Sequelize.col('liabilityType'),
                            'liabilityCategory', Sequelize.col('liabilityCategory'),
                            'amount', Sequelize.col('amount'),
                            'description', Sequelize.col('description')
                        )
                    ),
                    'liabilities'
                ]
            ],
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y')],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y'), 'DESC']],
            where: whereClause
        });

        const equitiesData = await Equity.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],
                [
                    Sequelize.fn(
                        'JSON_ARRAYAGG',
                        Sequelize.fn('JSON_OBJECT',
                            'equityId', Sequelize.col('equityId'),
                            'equityType', Sequelize.col('equityType'),
                            'amount', Sequelize.col('amount'),
                            'description', Sequelize.col('description')
                        )
                    ),
                    'equities'
                ]
            ],
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y')],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y'), 'DESC']],
            where: whereClause
        });

        const assetsData = await Asset.findAll({
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt'],
                [
                    Sequelize.fn(
                        'JSON_ARRAYAGG',
                        Sequelize.fn('JSON_OBJECT',
                            'assetId', Sequelize.col('assetId'),
                            'assetType', Sequelize.col('assetType'),
                            'assetCategory', Sequelize.col('assetCategory'),
                            'amount', Sequelize.col('amount'),
                        )
                    ),
                    'assets'
                ]
            ],
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y')],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y'), 'DESC']],
            where: whereClause
        });

        const [liabilities, assets, equities] = await Promise.all([
            Liability.findAll({ where: whereClause }),
            Asset.findAll({ where: whereClause }),
            Equity.findAll({ where: whereClause }),
        ]);
        const totalLiabilities = liabilities.reduce((sum, curr) => {
            return sum + curr.amount;
        }, 0);

        const totalEquities = equities.reduce((sum, curr) => {
            return sum + curr.amount;
        }, 0);

        const totalAssets = assets.reduce((sum, curr) => {
            return sum + curr.amount;
        }, 0);

        return { startDate, endDate, totalLiabilities, totalEquities, totalAssets, liabilitesData, equitiesData, assetsData }
    }
}

export default new BalanceSheetService;
import { Sequelize, where } from "sequelize";
import { Asset, Equity, Liability, User } from "../../model";

class BalanceSheetService {
    public async getBalanceSheetData(userId: number) {
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
            where: {
                userId: userId
            }
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
            where: {
                userId: userId
            }
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
                    'equities'
                ]
            ],
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y')],
            order: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%d-%m-%Y'), 'DESC']],
            where: {
                userId: userId
            }
        });

        return { liabilitesData, equitiesData, assetsData }
    }
}

export default new BalanceSheetService;
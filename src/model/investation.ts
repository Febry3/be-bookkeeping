import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./user";
import database from "../config/database";
import moneyConverter from "../utils/money-converter";

interface InvestationAttributes {
    investationId: number,
    investationType: string,
    investationCategory: string,
    amount: number,
    userId: number,
    convertedAmaount?: number
}

class Investation extends Model<InferAttributes<Investation>, InferCreationAttributes<Investation>> {
    declare investationId: number;
    declare investationType: string;
    declare investationCategory: string;
    declare amount: number;
    declare userId: ForeignKey<User['id']>;
    declare convertedAmaount?: number
}

Investation.init({
    investationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    investationType: {
        type: DataTypes.STRING
    },
    investationCategory: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        validate: {
            min: {
                args: [0],
                msg: "Amount must be positive value"
            }
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }
}, {
    tableName: "Investations",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Investations",
    hooks: {
        afterFind: (instances) => moneyConverter.addConvertedAmount(instances),
    }
});

Investation.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE",
});

export { Investation, InvestationAttributes };


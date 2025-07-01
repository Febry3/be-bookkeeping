import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import database from "../config/database";
import { User } from "./user";
import moneyConverter from "../utils/money-converter";

interface IncomeAttributes {
    incomeId: number,
    type: string,
    amount: number,
    description: string,
    incomeTax: number,
    userId: number,
    createdAt: Date,
    convertedAmount?: number,
}

class Income extends Model<InferAttributes<Income>, InferCreationAttributes<Income>> {
    declare incomeId: CreationOptional<number>;
    declare type: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare incomeTax: number;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare convertedAmount?: number;
}

Income.init({
    incomeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Tipe bisa 'main' atau 'side'
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Income type can't be null"
            }
        }
    },
    amount: {
        type: DataTypes.INTEGER, // Sebaiknya gunakan DECIMAL jika ada kemungkinan angka desimal
        allowNull: false,
        validate: {
            notNull: {
                msg: "Income amount can't be null"
            }
        },
        get() {
            const value = this.getDataValue('amount');
            return parseFloat(value as any);
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    incomeTax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: "Income user id can't be null"
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: "Incomes",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Income",
    hooks: {
        afterFind: (instances, options) => {
            if ((options as any).includeConversion) {
                moneyConverter.addConvertedAmount(instances);
            }
        }
    }
});

Income.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Income, IncomeAttributes };
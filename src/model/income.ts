import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import database from "../config/database";
import { User } from "./user";
import moneyConverter from "../utils/money-converter";

interface IncomeAttributes {
    incomeId: number,
    type: string,
    amount: number,
    description: string,
    userId: number,
    createdAt: Date,
    convertedAmount?: number,
}

class Income extends Model<InferAttributes<Income>, InferCreationAttributes<Income>> {
    declare incomeId: CreationOptional<number>;
    declare type: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>; // Ditambahkan untuk konsistensi dengan timestamps:true
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
    // Definisi eksplisit untuk createdAt dan updatedAt agar sesuai dengan deklarasi di class
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
        afterFind: (instances) => {
            const instancesArray = Array.isArray(instances) ? instances : [instances].filter(Boolean);
            for (const instance of instancesArray) {
                if (instance.user && instance.user.currency) {
                    const convertedValue = moneyConverter.convertTo(instance.user.currency, instance.getDataValue('amount'));
                    instance.dataValues.convertedAmount = convertedValue;
                }
                delete instance.dataValues.user;
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
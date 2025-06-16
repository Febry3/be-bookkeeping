import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import database from "../config/database";
import { User } from "./user";

interface IncomeAttributes {
    incomeId: number,
    type: string,
    amount: number,
    description: string,
    userId: number,
    createdAt: Date,
}

class Income extends Model<InferAttributes<Income>, InferCreationAttributes<Income>> {
    declare incomeId: CreationOptional<number>;
    declare type: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
}

Income.init({
    incomeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    createdAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: "Incomes",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Income",
});

Income.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Income, IncomeAttributes };
import {
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";
import { User } from "./user";
import database from "../config/database";

interface EquityAttributes {
    equityId: number;
    equityType: string;
    amount: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId: number;
}

class Equity extends Model<InferAttributes<Equity>, InferCreationAttributes<Equity>> {
    declare equityId: CreationOptional<number>;
    declare equityType: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
}

Equity.init({
    equityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    equityType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: "Amount must be positive value"
            }
        },
        get() {
            const value = this.getDataValue('amount');
            return parseFloat(value as any);
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
    }
}, {
    tableName: "Equities",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Equity",
});

Equity.belongsTo(User, {
    foreignKey: 'userId',
    as: "user",
    onDelete: "CASCADE",
});

export { Equity, EquityAttributes };

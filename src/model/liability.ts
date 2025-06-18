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

interface LiabilityAttributes {
    liabilityId: number;
    liabilityType: string;
    liabilityCategory: string;
    amount: number;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId: number;
}

class Liability extends Model<InferAttributes<Liability>, InferCreationAttributes<Liability>> {
    declare liabilityId: CreationOptional<number>;
    declare liabilityType: string;
    declare liabilityCategory: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
}

Liability.init({
    liabilityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    liabilityType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    liabilityCategory: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
        get() {
            const value = this.getDataValue('amount');
            return parseFloat(value as any);
        },
    },
    description: {
        type: DataTypes.STRING,
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
    tableName: "Liabilities",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Liability",
});

Liability.belongsTo(User, {
    foreignKey: 'userId',
    as: "user",
    onDelete: "CASCADE",
});

export { Liability, LiabilityAttributes };

// models/asset.ts

import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, CreationOptional, NonAttribute } from "sequelize";
import { User } from "./user";
import database from "../config/database";
import moneyConverter from "../utils/money-converter";

class Asset extends Model<InferAttributes<Asset>, InferCreationAttributes<Asset>> {
    declare assetId: CreationOptional<number>;
    declare assetType: string;
    declare assetCategory: string;
    declare assetName: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare user?: NonAttribute<User>;
    declare convertedAmount?: number;
}

Asset.init({
    assetId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    assetType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assetCategory: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assetName: {
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
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false
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
    tableName: "Assets",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Asset",
    hooks: {
        afterFind: (instances, options) => {
            if ((options as any).includeConversion) {
                moneyConverter.addConvertedAmount(instances);
            }
        }
    }
});

Asset.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Asset };
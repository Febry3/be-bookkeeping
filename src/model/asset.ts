// models/asset.ts

import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, CreationOptional, NonAttribute } from "sequelize";
import { User } from "./user";
import database from "../config/database";
import ConversionRate from "../config/conversion-rate";

class Asset extends Model<InferAttributes<Asset>, InferCreationAttributes<Asset>> {
    declare assetId: CreationOptional<number>;
    declare assetType: string;
    declare assetCategory: string;
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
        afterFind: (instances) => {
            const instancesArray = Array.isArray(instances) ? instances : [instances].filter(Boolean);
            for (const instance of instancesArray) {
                if (instance.user && instance.user.currency) {
                    const rate = parseFloat(ConversionRate[instance.user.currency]);
                    const convertedValue = parseFloat((instance.getDataValue('amount') * rate).toFixed(2));
                    instance.dataValues.convertedAmount = convertedValue;
                }
                delete instance.dataValues.user;
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
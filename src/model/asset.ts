import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, CreationOptional } from "sequelize";
import { User } from "./user";
import database from "../config/database";

interface AssetAttributes {
    assetId: number,
    assetType: string,
    assetCategory: string,
    amount: number,
    userId: number
}

class Asset extends Model<InferAttributes<Asset>, InferCreationAttributes<Asset>> {
    declare assetId: CreationOptional<number>;
    declare assetType: string;
    declare assetCategory: string;
    declare amount: number;
    declare userId: ForeignKey<User['id']>;
}

Asset.init({
    assetId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    assetType: {
        type: DataTypes.STRING
    },
    assetCategory: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }
}, {
    tableName: "Assets",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Asset",
});

Asset.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Asset, AssetAttributes };
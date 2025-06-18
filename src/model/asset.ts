// models/asset.ts

import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, CreationOptional } from "sequelize";
import { User } from "./user";
import database from "../config/database";

class Asset extends Model<InferAttributes<Asset>, InferCreationAttributes<Asset>> {
    declare assetId: CreationOptional<number>;
    declare assetType: string;
    declare assetCategory: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;

    // --- DEKLARASI EKSPLISIT UNTUK TIMESTAMPS ---
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    // ------------------------------------------
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
        }
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
    // --- DEFINISI EKSPLISIT UNTUK TIMESTAMPS ---
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
    // ------------------------------------------
}, {
    tableName: "Assets",
    timestamps: true, // Opsi ini tetap diperlukan agar Sequelize mengelolanya secara otomatis
    sequelize: database.sequelize,
    modelName: "Asset",
});

Asset.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Asset };
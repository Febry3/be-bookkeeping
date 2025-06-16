import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, CreationOptional } from "sequelize";
import { User } from "./user";
import database from "../config/database";

interface LiabilityAttributes {
    spendId: number,
    assetType: string,
    assetCategory: string,
    amount: number,
    userId: number
}

class Liability extends Model<InferAttributes<Liability>, InferCreationAttributes<Liability>> {
    declare spendId: CreationOptional<number>;
    declare liabilityType: string;
    declare liabilityCategory: string;
    declare amount: number;
    declare userId: ForeignKey<User['id']>;
}

Liability.init({
    spendId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    liabilityType: {
        type: DataTypes.STRING
    },
    liabilityCategory: {
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
    tableName: "Spends",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Spend",
});

Liability.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Liability, LiabilityAttributes };
import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./user";
import database from "../config/database";

interface EquityAttributes {
    equityId: number,
    equityType: string,
    amount: number,
    description: string,
    userId: number
}

class Equity extends Model<InferAttributes<Equity>, InferCreationAttributes<Equity>> {
    declare equityId: CreationOptional<number>;
    declare equityType: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
}

Equity.init({
    equityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    equityType: {
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
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }
}, {
    tableName: "Equities",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Equity",
});

Equity.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Equity, EquityAttributes };


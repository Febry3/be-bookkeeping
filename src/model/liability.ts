import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, CreationOptional } from "sequelize";
import { User } from "./user";
import database from "../config/database";

interface LiabilityAttributes {
    liabilityId: number,
    liabilityType: string,
    liabilityCategory: string,
    amount: number,
    description: string,
    userId: number
}

class Liability extends Model<InferAttributes<Liability>, InferCreationAttributes<Liability>> {
    declare liabilityId: CreationOptional<number>;
    declare liabilityType: string;
    declare liabilityCategory: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
}

Liability.init({
    liabilityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //either long or short term
    liabilityType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Liability type can't be null"
            }
        }
    },
    //could be loan (pinjaman) or debt (hutang)
    liabilityCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Liability category can't be null"
            }
        }
    },
    description: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Liability amount can't be null"
            },
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
    tableName: "Liabilities",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Liability",
});

Liability.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Liability, LiabilityAttributes };
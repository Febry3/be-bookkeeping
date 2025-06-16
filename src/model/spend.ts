import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./user";
import database from "../config/database";

interface SpendAttributes {
    spendId: number,
    spendingType: string,
    amount: number,
    description: string,
    userId: number,
    createdAt: Date
}

class Spend extends Model<InferAttributes<Spend>, InferCreationAttributes<Spend>> {
    declare spendId: CreationOptional<number>;
    declare spendingType: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;;
}

Spend.init({
    spendId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    //wage, buying stock or etc
    spendingType: {
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
    tableName: "Spends",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Spend",
});

Spend.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

export { Spend, SpendAttributes };


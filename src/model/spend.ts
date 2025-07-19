import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { User } from "./user";
import database from "../config/database";
import moneyConverter from "../utils/money-converter";

interface SpendAttributes {
    spendId: number,
    spendingType: string,
    amount: number,
    description: string,
    userId: number,
    createdAt: Date,
    convertedAmount?: number;
    quantity: number;
    totalAmount: number;
}

class Spend extends Model<InferAttributes<Spend>, InferCreationAttributes<Spend>> {
    declare spendId: CreationOptional<number>;
    declare spendingType: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare userId: ForeignKey<User['id']>;
    declare createdAt: CreationOptional<Date>;
    declare user?: NonAttribute<User>;
    declare convertedAmount?: number;
    declare quantity: number;
    declare totalAmount: number;
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: {
                args: [1],
                msg: "Quantity must be at least 1"
            }
        }
    },
    totalAmount: {
        type: DataTypes.INTEGER,
    },
    createdAt: {
        type: DataTypes.DATE
    },
}, {
    tableName: "Spends",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Spend",
    hooks: {
        afterFind: (instances, options) => {
            if ((options as any).includeConversion) {
                moneyConverter.addConvertedAmount(instances);
            }
        }
    }
});

Spend.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE",
});

export { Spend, SpendAttributes };


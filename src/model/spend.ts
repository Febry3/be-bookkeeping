import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { User } from "./user";
import database from "../config/database";
import { AfterFind } from "sequelize-typescript";
import ConversionRate from "../config/conversion-rate";

interface SpendAttributes {
    spendId: number,
    spendingType: string,
    amount: number,
    description: string,
    userId: number,
    createdAt: Date,
    convertedAmount?: number;
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
    },
}, {
    tableName: "Spends",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Spend",
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

Spend.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE",
});

export { Spend, SpendAttributes };


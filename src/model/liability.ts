import {
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreationOptional
} from "sequelize";
import { User } from "./user";
import database from "../config/database";
import ConversionRate from "../config/conversion-rate";

// Interface ini tidak wajib tapi bisa membantu
interface LiabilityAttributes {
    liabilityId: number;
    liabilityType: string;
    liabilityCategory: string;
    amount: number;
    description: string;
    dueDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    userId: number;
    convertedAmount?: number;
}

class Liability extends Model<InferAttributes<Liability>, InferCreationAttributes<Liability>> {
    declare liabilityId: CreationOptional<number>;
    declare liabilityType: string;
    declare liabilityCategory: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare dueDate: CreationOptional<Date>; // Field khusus untuk jatuh tempo
    declare userId: ForeignKey<User['id']>;
    declare convertedAmount?: number;
}

Liability.init({
    liabilityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    liabilityType: {
        type: DataTypes.STRING, // short-term atau long-term
        allowNull: false,
    },
    liabilityCategory: {
        type: DataTypes.STRING, // accountable, pinjaman bank, dll.
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
        get() {
            const value = this.getDataValue('amount');
            return parseFloat(value as any);
        },
    },
    description: {
        type: DataTypes.STRING,
    },
    // Field baru untuk tanggal jatuh tempo
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    tableName: "Liabilities",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Liability",
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

Liability.belongsTo(User, {
    foreignKey: 'userId',
    as: "user",
    onDelete: "CASCADE",
});

export { Liability, LiabilityAttributes };
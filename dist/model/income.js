"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Income = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_1 = require("./user");
class Income extends sequelize_1.Model {
}
exports.Income = Income;
Income.init({
    incomeId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Income type can't be null"
            }
        }
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Income amount can't be null"
            }
        }
    },
    description: {
        type: sequelize_1.DataTypes.STRING
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: "id"
        },
        allowNull: false,
        validate: {
            notNull: {
                msg: "Income user id can't be null"
            }
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: "Incomes",
    timestamps: true,
    sequelize: database_1.default.sequelize,
    modelName: "Income",
});
Income.belongsTo(user_1.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

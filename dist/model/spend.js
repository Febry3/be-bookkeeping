"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spend = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const database_1 = __importDefault(require("../config/database"));
class Spend extends sequelize_1.Model {
}
exports.Spend = Spend;
Spend.init({
    spendId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    spendingType: {
        type: sequelize_1.DataTypes.INTEGER
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(20, 2),
        validate: {
            min: {
                args: [0],
                msg: "Amount must be positive value"
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
        }
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: "Spends",
    timestamps: true,
    sequelize: database_1.default.sequelize,
    modelName: "Spend",
});
Spend.belongsTo(user_1.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

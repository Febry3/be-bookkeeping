"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const database_1 = __importDefault(require("../config/database"));
class Loan extends sequelize_1.Model {
}
exports.Loan = Loan;
Loan.init({
    loanId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    loanStart: {
        type: sequelize_1.DataTypes.DATE
    },
    loanEnd: {
        type: sequelize_1.DataTypes.DATE
    },
    interestRate: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
    status: {
        type: sequelize_1.DataTypes.STRING
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: "id"
        }
    }
}, {
    tableName: "Loans",
    timestamps: true,
    sequelize: database_1.default.sequelize,
    modelName: "Loan",
});
Loan.belongsTo(user_1.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

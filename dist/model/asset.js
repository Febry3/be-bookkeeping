"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const database_1 = __importDefault(require("../config/database"));
class Asset extends sequelize_1.Model {
}
exports.Asset = Asset;
Asset.init({
    assetId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    assetType: {
        type: sequelize_1.DataTypes.STRING
    },
    assetCategory: {
        type: sequelize_1.DataTypes.STRING
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
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: "id"
        }
    }
}, {
    tableName: "Assets",
    timestamps: true,
    sequelize: database_1.default.sequelize,
    modelName: "Asset",
});
Asset.belongsTo(user_1.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

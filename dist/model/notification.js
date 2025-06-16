"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const database_1 = __importDefault(require("../config/database"));
class Notification extends sequelize_1.Model {
}
exports.Notification = Notification;
Notification.init({
    notificationId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    notificationType: {
        type: sequelize_1.DataTypes.STRING
    },
    readStatus: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: user_1.User,
            key: "id"
        }
    }
}, {
    tableName: "Notifications",
    timestamps: true,
    sequelize: database_1.default.sequelize,
    modelName: "Notification",
});
Notification.belongsTo(user_1.User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: "user",
    onDelete: "CASCADE"
});

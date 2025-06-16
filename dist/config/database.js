"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = __importDefault(require("./config"));
class Database {
    constructor() {
        this.sequelize = new sequelize_typescript_1.Sequelize(config_1.default.dbName, config_1.default.dbUsername, config_1.default.dbPassword, {
            host: "localhost",
            dialect: "mysql",
        });
    }
}
exports.default = new Database();

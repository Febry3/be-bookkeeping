"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Config {
    constructor() {
        this.port = Number(process.env.PORT) || 3000;
        this.dbHost = process.env.DB_HOST || "127.0.0.1";
        this.dbPort = Number(process.env.DB_PORT) || 3306;
        this.dbUsername = process.env.DB_USERNAME || "root";
        this.dbPassword = process.env.DB_PASSWORD || "";
        this.dbName = process.env.DB_DATABASE || "";
        this.jwtKey = "abc";
        this.jwtExpiration = "24h";
    }
}
exports.default = new Config();

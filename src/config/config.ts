import dotenv from "dotenv";
dotenv.config();

class Config {
    port: number = Number(process.env.PORT) || 3000;
    dbHost: string = process.env.DB_HOST || "127.0.0.1";
    dbPort: number = Number(process.env.DB_PORT) || 3306;
    dbUsername: string = process.env.DB_USERNAME || "root";
    dbPassword: string = process.env.DB_PASSWORD || "";
    dbName: string = process.env.DB_DATABASE || "";
    jwtKey: string = "abc";
    jwtExpiration: string = "24h";
}

export default new Config;

import express, { json } from "express";
import config from "./config/config";
import { router as authRouter } from "./api/auth/auth.router";

const app = express();

app.use(json());


app.use('api', authRouter);

app.listen(config.port, async () => {
    try {
        console.log("Successfully connected to the database! Sequelize instance is ready.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
    console.log(`Runnin on port ${config.port}`);
})
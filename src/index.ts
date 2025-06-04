import express, { json } from "express";
import config from "./config/config";
import { router as authRouter } from "./api/auth/auth.router";
import errorHandlerMiddleware from "./middlewares/handle-error";
import { router as incomeRouter } from "./api/income/income.router";
import cookieParser from 'cookie-parser';
const app = express();

app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', incomeRouter)
app.use(errorHandlerMiddleware);

app.listen(config.port, async () => {
    try {
        console.log("Successfully connected to the database! Sequelize instance is ready.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
    console.log(`Runnin on port ${config.port}`);
})
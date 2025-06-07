import express, { json } from "express";
import config from "./config/config";
import { router as authRouter } from "./api/auth/auth.router";
import errorHandlerMiddleware from "./middlewares/handle-error";
import { router as incomeRouter } from "./api/income/income.router";

import { router as financialRouter } from "./api/financial/financial.router";
import cookieParser from 'cookie-parser';
import { User } from "./model/user";
import { Income } from "./model/income";
import { Asset } from "./model/asset";
import { Equity } from "./model/equity";
import { Investation } from "./model/investation";
import { Liability } from "./model/liability";
import { Loan } from "./model/loan";
import { Spend } from "./model/spend";
const app = express();

app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', authRouter);
app.use('/api', incomeRouter)
app.use('/api', financialRouter)
app.use(errorHandlerMiddleware);

app.listen(config.port, async () => {
    try {
        User.sync();
Income.sync();
Asset.sync();
Equity.sync();
Investation.sync();
Liability.sync();
Loan.sync();

Spend.sync();
        console.log("Successfully connected to the database! Sequelize instance is ready.");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
    console.log(`Runnin on port ${config.port}`);
})
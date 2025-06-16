import express, { json } from "express";
import config from "./config/config";
import { router as authRouter } from "./api/auth/auth.router";
import { router as incomeRouter } from "./api/income/income.router";
import { router as financialRouter } from "./api/financial/financial.router";
import errorHandlerMiddleware from "./middlewares/handle-error";
import cookieParser from 'cookie-parser';

// Import semua model
import { User } from "./model/user";
import { Income } from "./model/income";
import { Asset } from "./model/asset";
import { Equity } from "./model/equity";
import { Investation } from "./model/investation";
import { Liability } from "./model/liability";
import { Loan } from "./model/loan";
import { Spend } from "./model/spend";

const app = express();

// Middleware
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
app.use('/api', authRouter);
app.use('/api', incomeRouter);
app.use('/api', financialRouter);

// Tes endpoint utama
app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

// Error handling
app.use(errorHandlerMiddleware);

// Start server
app.listen(config.port, '0.0.0.0', async () => {
  try {
    await User.sync();
    await Income.sync();
    await Asset.sync();
    await Equity.sync();
    await Investation.sync();
    await Liability.sync();
    await Loan.sync();
    await Spend.sync();

    console.log("✅ Successfully connected to the database! Sequelize instance is ready.");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }

  console.log(`🚀 Running on port ${config.port}`);
});

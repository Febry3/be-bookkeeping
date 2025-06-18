import express, { json } from "express";
import config from "./config/config";
import { router as authRouter } from "./api/auth/auth.router";
import { router as incomeRouter } from "./api/income/income.router";
import { router as financialRouter } from "./api/financial/financial.router";
import { router as spendRouter } from "./api/spend/spend.router";
import { router as liabilityRouter } from "./api/liability/liability.router";
import { router as equityRouter } from "./api/equity/equity.router";
import errorHandlerMiddleware from "./middlewares/handle-error";
import cookieParser from 'cookie-parser';
import {
  User, Income, Asset, Equity, Investation, Liability, Loan, Spend
} from './model';
// Import semua model
const app = express();

// Middleware
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Router
app.use('/api', authRouter);
app.use('/api', spendRouter);
app.use('/api', incomeRouter);
app.use('/api', financialRouter);
app.use('/api', liabilityRouter);
app.use('/api', equityRouter);

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

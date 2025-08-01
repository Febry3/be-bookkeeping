import express, { json } from "express";
import config from "./config/config";
import { router as authRouter } from "./api/auth/auth.router";
import { router as incomeRouter } from "./api/income/income.router";
import { router as financialRouter } from "./api/asset/financial.router";
import { router as spendRouter } from "./api/spend/spend.router";
import { router as liabilityRouter } from "./api/liability/liability.router";
import { router as equityRouter } from "./api/equity/equity.router";
import { router as balanceSheetRouter } from "./api/balance-sheet/balance-sheet.router";
import errorHandlerMiddleware from "./middlewares/handle-error";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
//import cors from 'cors';
import {
  User, Income, Asset, Equity, Investation, Liability, Loan, Spend
} from './model';
import morganMiddleware from "./middlewares/morgan";
import { swaggerSpec } from "./swagger/swagger";

// Import semua model
const app = express();

// Middleware
//app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morganMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Router
app.use('/api', authRouter);
app.use('/api', spendRouter);
app.use('/api', incomeRouter);
app.use('/api', financialRouter);
app.use('/api', liabilityRouter);
app.use('/api', equityRouter);
app.use('/api', balanceSheetRouter);

// Tes endpoint utama
app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

// Error handling
app.use(errorHandlerMiddleware);

// Start server
app.listen(config.port, '0.0.0.0', async () => {
  try {
    // // Sync User model first since other models depend on it
    // await User.sync({ force: true });
    // // Then sync the dependent models
    // await Promise.all([
    //   Income.sync({ force: true }),
    //   Asset.sync({ force: true }),
    //   Equity.sync({ force: true }),
    //   Investation.sync({ force: true }),
    //   Liability.sync({ force: true }),
    //   Loan.sync({ force: true }),
    //   Spend.sync({ force: true })
    // ]);
    console.log("✅ Successfully connected to the database! Sequelize instance is ready.");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
  console.log(`🚀 Running on port ${config.port}`);
});

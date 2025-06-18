import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import balanceSheetController from "./balance-sheet.controller";

const { router } = express();

router.get("/balance-sheet", authenticateUser.authenticateUser, balanceSheetController.getBalanceSheetData as RequestHandler);

export { router };
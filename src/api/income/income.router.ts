import express, { RequestHandler } from "express";
import incomeController from "./income.controller";
import authenticateUser from "../../middlewares/authenticate-user";

const { router } = express();

router.get('/income', authenticateUser.authenticateUser, incomeController.getAllIncomes as RequestHandler);

export { router };
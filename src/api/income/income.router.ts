import express, { RequestHandler } from "express";
import incomeController from "./income.controller";
import authenticateUser from "../../middlewares/authenticate-user";

const { router } = express();

router.get('/income', authenticateUser.authenticateUser, incomeController.getAllIncomes as RequestHandler);
router.post('/income', authenticateUser.authenticateUser, incomeController.createIncome as RequestHandler);
router.put('/income/:id', authenticateUser.authenticateUser, incomeController.updateIncome as RequestHandler);
router.delete('/income/:id', authenticateUser.authenticateUser, incomeController.deleteIncome as RequestHandler);
router.get('/income/info', authenticateUser.authenticateUser, incomeController.getIncomeInformation as RequestHandler);

export { router };
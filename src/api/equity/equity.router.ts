import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import equityController from "./equity.controller";

const { router } = express();

router.get('/income', authenticateUser.authenticateUser, equityController.getAllEquities as RequestHandler);
router.post('/income', authenticateUser.authenticateUser, equityController.createEquity as RequestHandler);
router.put('/income/:id', authenticateUser.authenticateUser, equityController.updateSpend as RequestHandler);
router.delete('/income/:id', authenticateUser.authenticateUser, equityController.deleteSpend as RequestHandler);

export { router };
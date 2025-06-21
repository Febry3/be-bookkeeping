import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import equityController from "./equity.controller";

const { router } = express();

router.get('/equity', authenticateUser.authenticateUser, equityController.getAllEquities as RequestHandler);
router.post('/equity', authenticateUser.authenticateUser, equityController.createEquity as RequestHandler);
router.put('/equity/:id', authenticateUser.authenticateUser, equityController.updateSpend as RequestHandler);
router.delete('/equity/:id', authenticateUser.authenticateUser, equityController.deleteSpend as RequestHandler);

export { router };
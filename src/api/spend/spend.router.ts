import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import spendController from "./spend.controller";

const router = express();

router.get('/spend', authenticateUser.authenticateUser, spendController.getAllSpends as RequestHandler);
router.post('/spend', authenticateUser.authenticateUser, spendController.createSpend as RequestHandler);
router.put('/spend/:id', authenticateUser.authenticateUser, spendController.updateSpend as RequestHandler);
router.delete('/spend/:id', authenticateUser.authenticateUser, spendController.deleteSpend as RequestHandler);

export { router };
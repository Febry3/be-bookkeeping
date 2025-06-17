import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import liabilityController from "./liability.controller";

const { router } = express();

router.get('/liability', authenticateUser.authenticateUser, liabilityController.getAllLiability as RequestHandler);
router.post('/liability', authenticateUser.authenticateUser, liabilityController.createLiability as RequestHandler);
router.put('/liability/:liabilityId', authenticateUser.authenticateUser, liabilityController.updateLiability as RequestHandler);
router.delete('/liability/:liabilityId', authenticateUser.authenticateUser, liabilityController.deleteLiability as RequestHandler);

export { router };
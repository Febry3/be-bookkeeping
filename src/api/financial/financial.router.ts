import express, { RequestHandler } from "express";
import financialController from "./financial.controller";
// PATH DIPERBAIKI
import authenticateUser from "../../middlewares/authenticate-user"; 

const router = express.Router();

router.use(authenticateUser.authenticateUser as RequestHandler);

router.get('/financials', financialController.getAllFinancials as RequestHandler);

router.post('/financials/asset', financialController.createAsset as RequestHandler);
router.get('/financials/asset/:id', financialController.getAssetById as RequestHandler);
router.patch('/financials/asset/:id', financialController.updateAsset as RequestHandler);
router.delete('/financials/asset/:id', financialController.deleteAsset as RequestHandler);

router.post('/financials/liability', financialController.createLiability as RequestHandler);

export { router as financialRouter };
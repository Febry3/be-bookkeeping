import express, { RequestHandler } from "express";
import financialController from "./financial.controller";
// Pastikan path ke middleware autentikasi Anda sudah benar
import authenticateUser from "../../middlewares/authenticate-user"; 

const router = express.Router();

// =============================================
// ============ RUTE UNTUK ASET (ASSET) ========
// =============================================
router.post('/assets', authenticateUser.authenticateUser as RequestHandler, financialController.createAsset as RequestHandler);
router.get('/assets', authenticateUser.authenticateUser as RequestHandler, financialController.getAllAssets as RequestHandler);
router.get('/assets/:id', authenticateUser.authenticateUser as RequestHandler, financialController.getAssetById as RequestHandler);
router.patch('/assets/:id', authenticateUser.authenticateUser as RequestHandler, financialController.updateAsset as RequestHandler);
router.delete('/assets/:id', authenticateUser.authenticateUser as RequestHandler, financialController.deleteAsset as RequestHandler);


export { router };
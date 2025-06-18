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

// =============================================
// =========== RUTE UNTUK EKUITAS (EQUITY) =======
// =============================================
router.post('/equities', authenticateUser.authenticateUser as RequestHandler, financialController.createEquity as RequestHandler);
router.get('/equities', authenticateUser.authenticateUser as RequestHandler, financialController.getAllEquities as RequestHandler);
router.get('/equities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.getEquityById as RequestHandler);
router.patch('/equities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.updateEquity as RequestHandler);
router.delete('/equities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.deleteEquity as RequestHandler);

// =============================================
// ======== RUTE UNTUK LIABILITAS (LIABILITY) ====
// =============================================
router.post('/liabilities', authenticateUser.authenticateUser as RequestHandler, financialController.createLiability as RequestHandler);
router.get('/liabilities', authenticateUser.authenticateUser as RequestHandler, financialController.getAllLiabilities as RequestHandler);
router.get('/liabilities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.getLiabilityById as RequestHandler);
router.patch('/liabilities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.updateLiability as RequestHandler);
router.delete('/liabilities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.deleteLiability as RequestHandler);

// Ekspor router agar bisa digunakan di file utama (app.ts atau index.ts)
export { router };
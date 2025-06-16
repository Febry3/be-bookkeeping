import express, { RequestHandler } from "express";
import financialController from "./financial.controller";
// Menggunakan path middleware seperti pada contoh Anda
import authenticateUser from "../../middlewares/authenticate-user"; 

const router = express.Router();

// Middleware tidak lagi diterapkan secara global di sini, melainkan pada tiap rute.
// router.use(authenticateUser.authenticateUser as RequestHandler); // Baris ini dihapus

// Middleware 'authenticateUser' ditambahkan ke setiap endpoint secara manual
router.get('/financials', authenticateUser.authenticateUser as RequestHandler, financialController.getAllFinancials as RequestHandler);

router.post('/financials/asset', authenticateUser.authenticateUser as RequestHandler, financialController.createAsset as RequestHandler);
router.get('/financials/asset/:id', authenticateUser.authenticateUser as RequestHandler, financialController.getAssetById as RequestHandler);
router.patch('/financials/asset/:id', authenticateUser.authenticateUser as RequestHandler, financialController.updateAsset as RequestHandler);
router.delete('/financials/asset/:id', authenticateUser.authenticateUser as RequestHandler, financialController.deleteAsset as RequestHandler);

router.post('/financials/liability', authenticateUser.authenticateUser as RequestHandler, financialController.createLiability as RequestHandler);

export { router  };
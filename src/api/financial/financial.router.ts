import express, { RequestHandler } from "express";
import financialController from "./financial.controller";
// Pastikan path ke middleware autentikasi Anda sudah benar
import authenticateUser from "../../middlewares/authenticate-user"; 

const router = express.Router();

// =============================================
// =========== RUTE UNTUK EKUITAS (EQUITY) =======
// =============================================

// Membuat ekuitas baru
// POST /api/equities
router.post('/equities', authenticateUser.authenticateUser as RequestHandler, financialController.createEquity as RequestHandler);

// Mendapatkan semua data ekuitas milik pengguna yang login
// GET /api/equities
router.get('/equities', authenticateUser.authenticateUser as RequestHandler, financialController.getAllEquities as RequestHandler);

// Mendapatkan satu data ekuitas berdasarkan ID
// GET /api/equities/:id
router.get('/equities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.getEquityById as RequestHandler);

// Memperbarui data ekuitas berdasarkan ID
// PATCH /api/equities/:id
router.patch('/equities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.updateEquity as RequestHandler);

// Menghapus data ekuitas berdasarkan ID
// DELETE /api/equities/:id
router.delete('/equities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.deleteEquity as RequestHandler);


// =============================================
// ======== RUTE UNTUK LIABILITAS (LIABILITY) ====
// =============================================

// Membuat liabilitas baru
// POST /api/liabilities
router.post('/liabilities', authenticateUser.authenticateUser as RequestHandler, financialController.createLiability as RequestHandler);

// Mendapatkan semua data liabilitas milik pengguna yang login
// GET /api/liabilities
router.get('/liabilities', authenticateUser.authenticateUser as RequestHandler, financialController.getAllLiabilities as RequestHandler);

// Mendapatkan satu data liabilitas berdasarkan ID
// GET /api/liabilities/:id
router.get('/liabilities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.getLiabilityById as RequestHandler);

// Memperbarui data liabilitas berdasarkan ID
// PATCH /api/liabilities/:id
router.patch('/liabilities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.updateLiability as RequestHandler);

// Menghapus data liabilitas berdasarkan ID
// DELETE /api/liabilities/:id
router.delete('/liabilities/:id', authenticateUser.authenticateUser as RequestHandler, financialController.deleteLiability as RequestHandler);


// Ekspor router agar bisa digunakan di file utama (app.ts atau index.ts)
export { router };
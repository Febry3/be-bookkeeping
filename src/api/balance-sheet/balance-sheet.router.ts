import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import balanceSheetController from "./balance-sheet.controller";

const { router } = express();

router.get("/balance-sheet", authenticateUser.authenticateUser, balanceSheetController.getBalanceSheetData as RequestHandler);

export { router };

/**
 * @swagger
 * /api/balance-sheet:
 *   get:
 *     summary: Get all balance-sheet records
 *     tags: [Balance Sheet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: date
 *     responses:
 *       200:
 *         description: Balance sheet record fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data Fetched
 *                 data:
 *                   type: object
 *                   example:
 *                     
 *       401:
 *         description: Unauthorized
 */

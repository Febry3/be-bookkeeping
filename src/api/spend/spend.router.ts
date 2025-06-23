import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import spendController from "./spend.controller";

const router = express();

router.get('/spend', authenticateUser.authenticateUser, spendController.getAllSpends as RequestHandler);
router.post('/spend', authenticateUser.authenticateUser, spendController.createSpend as RequestHandler);
router.put('/spend/:id', authenticateUser.authenticateUser, spendController.updateSpend as RequestHandler);
router.delete('/spend/:id', authenticateUser.authenticateUser, spendController.deleteSpend as RequestHandler);

export { router };

/**
 * @swagger
 * tags:
 *   name: Spend
 *   description: Spending management endpoints
 */

/**
 * @swagger
 * /api/spend:
 *   get:
 *     summary: Get all spending records
 *     tags: [Spend]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by spending type (e.g. stock)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [weekly, monthly, yearly]
 *         description: Filter by date range
 *     responses:
 *       200:
 *         description: Spending record fetched succesfully
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
 *                     totalStockSpending: 10000
 *                     totalAllSpending: 10000
 *                     spends:
 *                        amount: 10000
 *                        spendId: 1
 *                        spendingType: main
 *                        description: Beli Saham
 *                        userId: 1
 *                        createdAt: 2025-06-21T11:00:00.000Z
 *                        updatedAt: 2025-06-21T11:00:00.000Z
 *                        convertedAmount: 2000
 *                        currency: USD
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/spend:
 *   post:
 *     summary: Create a new spending record
 *     tags: [Spend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - spendingType
 *               - amount
 *             properties:
 *               spendingType:
 *                 type: string
 *                 example: stock
 *               amount:
 *                 type: number
 *                 example: 1500
 *               description:
 *                 type: string
 *                 example: Buying stock on marketplace
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-21T00:00:00Z
 *     responses:
 *       201:
 *         description: Spending created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/spend/{id}:
 *   put:
 *     summary: Update a spending record
 *     tags: [Spend]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Spend ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spendingType:
 *                 type: string
 *                 example: food
 *               amount:
 *                 type: number
 *                 example: 250
 *               description:
 *                 type: string
 *                 example: Lunch expense
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-22T12:30:00Z
 *     responses:
 *       200:
 *         description: Spending updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Spending not found
 */

/**
 * @swagger
 * /api/spend/{id}:
 *   delete:
 *     summary: Delete a spending record
 *     tags: [Spend]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Spend ID
 *     responses:
 *       200:
 *         description: Spending deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Spending not found
 */
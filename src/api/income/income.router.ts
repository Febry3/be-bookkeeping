import express, { RequestHandler } from "express";
import incomeController from "./income.controller";
import authenticateUser from "../../middlewares/authenticate-user";

const { router } = express();

router.get('/income', authenticateUser.authenticateUser, incomeController.getAllIncomes as RequestHandler);
router.post('/income', authenticateUser.authenticateUser, incomeController.createIncome as RequestHandler);
router.put('/income/:id', authenticateUser.authenticateUser, incomeController.updateIncome as RequestHandler);
router.delete('/income/:id', authenticateUser.authenticateUser, incomeController.deleteIncome as RequestHandler);
router.get('/income/info', authenticateUser.authenticateUser, incomeController.getIncomeInformation as RequestHandler);

export { router };

/**
 * @swagger
 * tags:
 *   name: Income
 *   description: Income management endpoints
 */

/**
 * @swagger
 * /api/income:
 *   get:
 *     summary: Get all income records
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by income type (e.g. main, side)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [weekly, monthly, yearly]
 *         description: Filter by date range
 *     responses:
 *       200:
 *         description: Income record fetched succesfully
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
 *                     totalMainIncome: 10000
 *                     totalSideIncome: 10000
 *                     totalAllIncome: 20000
 *                     incomes:
 *                        amount: 10000
 *                        incomeId: 1
 *                        type: main
 *                        description: Tunjangan Hari Raya
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
 * /api/income:
 *   post:
 *     summary: Create a new income record
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *             properties:
 *               type:
 *                 type: string
 *                 example: main
 *               amount:
 *                 type: number
 *                 example: 5000
 *               description:
 *                 type: string
 *                 example: Monthly salary
 *               incomeDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-21T00:00:00Z
 *     responses:
 *       201:
 *         description: Income created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/income/{id}:
 *   put:
 *     summary: Update an income record
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Income ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: side
 *               amount:
 *                 type: number
 *                 example: 1000
 *               description:
 *                 type: string
 *                 example: Freelance project
 *               incomeDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-22T12:30:00Z
 *     responses:
 *       200:
 *         description: Income updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Income not found
 */

/**
 * @swagger
 * /api/income/{id}:
 *   delete:
 *     summary: Delete an income record
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Income ID
 *     responses:
 *       200:
 *         description: Income deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Income not found
 */

/**
 * @swagger
 * /api/income/info:
 *   get:
 *     summary: Get income financial information
 *     tags: [Income]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Financial summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stockExpenses:
 *                   type: number
 *                 incomes:
 *                   type: number
 *                 allExpenses:
 *                   type: number
 *                 grossProfit:
 *                   type: number
 *                 ebit:
 *                   type: number
 *                 taxRate:
 *                   type: number
 *                   example: 0.1
 *                 netProfit:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
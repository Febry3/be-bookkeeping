import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import equityController from "./equity.controller";

const { router } = express();

router.get('/equity', authenticateUser.authenticateUser, equityController.getAllEquities as RequestHandler);
router.post('/equity', authenticateUser.authenticateUser, equityController.createEquity as RequestHandler);
router.put('/equity/:id', authenticateUser.authenticateUser, equityController.updateSpend as RequestHandler);
router.delete('/equity/:id', authenticateUser.authenticateUser, equityController.deleteSpend as RequestHandler);

export { router };

/**
 * @swagger
 * /api/equity:
 *   get:
 *     summary: Get all equity records
 *     tags: [Equity]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Equities fetched successfully
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
 *                   example: Data fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       equityId:
 *                         type: integer
 *                         example: 6
 *                       equityType:
 *                         type: string
 *                         example: "Owner's Capital"
 *                       amount:
 *                         type: number
 *                         example: 25000
 *                       description:
 *                         type: string
 *                         example: "Investment of personal equipment"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-18T14:30:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-18T14:30:00.000Z"
 *                       userId:
 *                         type: integer
 *                         example: 3
 *                       convertedAmount:
 *                         type: number
 *                         example: 5250
 *                       currency:
 *                         type: string
 *                         example: "USD"
 */


/**
 * @swagger
 * /api/equity:
 *   post:
 *     summary: Create a new equity record
 *     tags: [Equity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - equityType
 *               - amount
 *             properties:
 *               equityType:
 *                 type: string
 *                 example: "Owner's Capital"
 *               amount:
 *                 type: number
 *                 example: 25000
 *               description:
 *                 type: string
 *                 example: "Investment of personal equipment"
 *               equityDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-18T14:30:00.000Z"
 *     responses:
 *       201:
 *         description: Equity created successfully
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
 *                   example: Data Created
 *                 data:
 *                   $ref: '#/components/schemas/Equity'
 */


/**
 * @swagger
 * /api/equity/{id}:
 *   put:
 *     summary: Update an existing equity record
 *     tags: [Equity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Equity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spendingType:
 *                 type: string
 *                 example: "Owner's Capital"
 *               amount:
 *                 type: number
 *                 example: 25000
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               equityDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-18T14:30:00.000Z"
 *     responses:
 *       201:
 *         description: Equity updated successfully
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
 *                   example: Data Updated
 *                 data:
 *                   $ref: '#/components/schemas/Equity'
 */

/**
 * @swagger
 * /api/equity/{id}:
 *   delete:
 *     summary: Delete an equity record
 *     tags: [Equity]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Equity ID
 *     responses:
 *       201:
 *         description: Equity deleted successfully
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
 *                   example: Data Deleted
 */

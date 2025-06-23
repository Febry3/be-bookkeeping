import express, { RequestHandler } from "express";
import authenticateUser from "../../middlewares/authenticate-user";
import liabilityController from "./liability.controller";

const { router } = express();


router.get('/liability', authenticateUser.authenticateUser, liabilityController.getAllLiability as RequestHandler);
router.get('/liability/:liabilityId', authenticateUser.authenticateUser, liabilityController.getLiabilityById as RequestHandler);
router.post('/liability', authenticateUser.authenticateUser, liabilityController.createLiability as RequestHandler);
router.put('/liability/:liabilityId', authenticateUser.authenticateUser, liabilityController.updateLiability as RequestHandler);
router.delete('/liability/:liabilityId', authenticateUser.authenticateUser, liabilityController.deleteLiability as RequestHandler);

export { router };


/**
 * @swagger
 * /api/liability:
 *   get:
 *     summary: Get all liability records
 *     tags: [Liability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by liability type (e.g. long-term or short-term)
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [weekly, monthly, yearly]
 *         description: Filter by date range
 *     responses:
 *       200:
 *         description: Liability record fetched succesfully
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
 *                        liabilityId: 1
 *                        liabilityType: Long term
 *                        liabilityCategory: Hutang
 *                        description: Test
 *                        dueDate: 2025-06-21T11:00:00.000Z
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
 * /api/liability/{liabilityId}:
 *   get:
 *     summary: Get a liability by ID
 *     tags: [Liability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: liabilityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Liability ID
 *     responses:
 *       200:
 *         description: Liability detail
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/liability:
 *   post:
 *     summary: Create a new liability
 *     tags: [Liability]
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
 *               - liabilityCategory
 *             properties:
 *               type:
 *                 type: string
 *                 example: short-term
 *               amount:
 *                 type: number
 *                 example: 1000
 *               liabilityCategory:
 *                 type: string
 *                 example: credit card
 *               description:
 *                 type: string
 *                 example: Monthly payment
 *     responses:
 *       201:
 *         description: Liability created
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/liability/{liabilityId}:
 *   put:
 *     summary: Update a liability
 *     tags: [Liability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: liabilityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Liability ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: long-term
 *               amount:
 *                 type: number
 *                 example: 2000
 *               liabilityCategory:
 *                 type: string
 *                 example: student loan
 *               description:
 *                 type: string
 *                 example: Updated note
 *     responses:
 *       200:
 *         description: Liability updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /api/liability/{liabilityId}:
 *   delete:
 *     summary: Delete a liability
 *     tags: [Liability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: liabilityId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Liability ID
 *     responses:
 *       200:
 *         description: Liability deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
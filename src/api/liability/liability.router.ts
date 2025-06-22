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
 * /liability:
 *   get:
 *     summary: Get all liabilities
 *     tags: [Liability]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of liabilities
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /liability/{liabilityId}:
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
 * /liability:
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
 * /liability/{liabilityId}:
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
 * /liability/{liabilityId}:
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
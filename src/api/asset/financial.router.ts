import express, { RequestHandler } from "express";
import financialController from "./financial.controller";

import authenticateUser from "../../middlewares/authenticate-user";

const router = express.Router();

router.post('/assets', authenticateUser.authenticateUser as RequestHandler, financialController.createAsset as RequestHandler);
router.get('/assets', authenticateUser.authenticateUser as RequestHandler, financialController.getAllAssets as RequestHandler);
router.get('/assets/:id', authenticateUser.authenticateUser as RequestHandler, financialController.getAssetById as RequestHandler);
router.patch('/assets/:id', authenticateUser.authenticateUser as RequestHandler, financialController.updateAsset as RequestHandler);
router.delete('/assets/:id', authenticateUser.authenticateUser as RequestHandler, financialController.deleteAsset as RequestHandler);


export { router };

/**
 * @swagger
 * /assets:
 *   post:
 *     summary: Create a new asset
 *     tags:
 *       - Assets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assetName:
 *                 type: string
 *               assetType:
 *                 type: string
 *               assetCategory:
 *                 type: string
 *               assetValue:
 *                 type: number
 *               assetDescription:
 *                 type: string
 *               assetDate:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - assetName
 *               - assetType
 *               - assetCategory
 *               - assetValue
 *     responses:
 *       201:
 *         description: Asset created successfully
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
 *                   example: Data aset berhasil dibuat
 *                 data:
 *                   type: object
 *                   properties:
 *                     assetId:
 *                       type: integer
 *                       example: 2
 *                     assetName:
 *                       type: string
 *                       example: Mobil Legend
 *                     assetType:
 *                       type: string
 *                       example: test
 *                     assetCategory:
 *                       type: string
 *                       example: test
 *                     amount:
 *                       type: number
 *                       example: 80000
 *                     description:
 *                       type: string
 *                       example: test
 *                     userId:
 *                       type: integer
 *                       example: 3
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2000-12-12T00:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-27T08:54:48.000Z
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /assets:
 *   get:
 *     summary: Get all assets for the authenticated user
 *     tags:
 *       - Assets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of assets
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
 *                   example: Semua data aset berhasil diambil
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assetId:
 *                         type: integer
 *                         example: 2
 *                       assetName:
 *                         type: string
 *                         example: Mobil Legend
 *                       assetType:
 *                         type: string
 *                         example: test
 *                       assetCategory:
 *                         type: string
 *                         example: test
 *                       amount:
 *                         type: number
 *                         example: 80000
 *                       description:
 *                         type: string
 *                         example: test
 *                       userId:
 *                         type: integer
 *                         example: 3
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2000-12-12T00:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-06-27T08:54:48.000Z
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /assets/{id}:
 *   get:
 *     summary: Get a single asset by ID
 *     tags:
 *       - Assets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asset found
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
 *                   example: Data aset berhasil ditemukan
 *                 data:
 *                   type: object
 *                   properties:
 *                     assetId:
 *                       type: integer
 *                       example: 2
 *                     assetName:
 *                       type: string
 *                       example: Mobil Legend
 *                     assetType:
 *                       type: string
 *                       example: test
 *                     assetCategory:
 *                       type: string
 *                       example: test
 *                     amount:
 *                       type: number
 *                       example: 80000
 *                     description:
 *                       type: string
 *                       example: test
 *                     userId:
 *                       type: integer
 *                       example: 3
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2000-12-12T00:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-06-27T08:54:48.000Z
 *       404:
 *         description: Asset not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /assets/{id}:
 *   patch:
 *     summary: Update an asset by ID
 *     tags:
 *       - Assets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assetName:
 *                 type: string
 *               assetType:
 *                 type: string
 *               assetCategory:
 *                 type: string
 *               assetValue:
 *                 type: number
 *               assetDescription:
 *                 type: string
 *               assetDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Asset updated
 *       404:
 *         description: Asset not found
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /assets/{id}:
 *   delete:
 *     summary: Delete an asset by ID
 *     tags:
 *       - Assets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asset deleted
 *       404:
 *         description: Asset not found
 *       401:
 *         description: Unauthorized
 */


import express, { RequestHandler } from "express";
import authController from "./auth.controller";
import authenticateUser from "../../middlewares/authenticate-user";

const { router } = express();

router.post('/login', authController.login as RequestHandler);
router.post('/register', authController.register as RequestHandler);
router.put('/profile', authenticateUser.authenticateUser, authController.updateProfile as RequestHandler);

export { router };

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *               role:
 *                 type: string
 *                 example: Usahawan
 *     responses:
 *       201:
 *         description: Registration successful
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
 *                   example: Registration Success
 *                 data:
 *                   type: object
 *                   example:
 *                     currency: MYR
 *                     language: Malaysian
 *                     id: 20,
 *                     name: asep1
 *                     email: asep1@gmail.com
 *                     password: $2b$10$PlGohSJdMa0rM0FaTr2zquqW5hpddHAOOWRyViHyvzIPqNKbX0kUW
 *                     role: usahawan
 *                     updatedAt: 2025-06-22T19:06:21.457Z
 *                     createdAt: 2025-06-22T19:06:21.457Z
 *       409:
 *         description: Invalid input or email already exists
 *       500:
 *         description: Internal server error
 * 
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Login successful
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
 *                   example: Login Success
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIj
 *     
 *       400:
 *         description: Please provide email or password
 *       401:
 *         description: Email didnt match any record or false credential
 *       500:
 *         description: Internal server error
 * 
 */

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update the profile of user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               role:
 *                 type: string
 *                 example: Usahawan
 *               language:
 *                 type: string
 *                 example: Malaysian
 *               currency:
 *                 type: string
 *                 example: USD
 *     responses:
 *       200:
 *         description: Update successful
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
 *                   example: Update Success
 *                 data:
 *                   type: object
 *                   example:
 *                     id: 1
 *                     name: John Doe
 *                     email: johndoe@example.com
 *                     role: user
 *                     language: Malaysian
 *                     currency: USD
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

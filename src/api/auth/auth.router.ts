import express, { RequestHandler } from "express";
import authController from "./auth.controller";
import authenticateUser from "../../middlewares/authenticate-user";

const { router } = express();

router.post('/login', authController.login as RequestHandler);
router.post('/register', authController.register as RequestHandler);
router.put('/profile', authenticateUser.authenticateUser, authController.updateProfile as RequestHandler);

export { router };
import express, { RequestHandler } from "express";
import authController from "./auth.controller";

const { router } = express();

router.post('/login', authController.login as RequestHandler);
router.post('/register', authController.register as RequestHandler);

export { router };
import express from 'express';
import authController from '../controller/auth.controller.js';

const router = express.Router();

// router.get("/signup", authController.signup)
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
import express from 'express';
import userController from "../controller/user.controller.js";
import verifyJwt from '../middlewares/verifyJwt.js';
const router = express.Router()

router.get('/:id', verifyJwt.isUser,userController.getUser)


export default router;

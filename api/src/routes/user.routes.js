import express from 'express';
import userController from '../controller/user.controller.js';
import verifyJwt from '../middlewares/verifyJwt.js';
const router = express.Router();

router.get('/:id', verifyJwt.isUser, userController.getUser);
router.get('/', verifyJwt.isUser, userController.getUsers); 
router.put('/:id', verifyJwt.isUser, userController.editUser);
router.delete('/:id', verifyJwt.isUser, userController.deleteUser);

export default router;

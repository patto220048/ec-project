import express from 'express';
import orderController from '../controller/order.controller.js';
const router = express.Router();
import verifyToken from '../middlewares/verifyJwt.js';

router.post('/', verifyToken.isUser, orderController.create);
router.get('/orders', verifyToken.isAdmin, orderController.gets);
router.get('/totalsales', verifyToken.isAdmin, orderController.getTotalSales);
router.get('/userorders/:userId', verifyToken.isAdmin, orderController.getUserOrders);
router.get('/count', verifyToken.isAdmin, orderController.getCountOder);
router.get('/:id', verifyToken.isUser, orderController.get);
router.put('/:id', verifyToken.isUser, orderController.update);
router.delete('/:id', verifyToken.isUser, orderController.delete);

export default router;

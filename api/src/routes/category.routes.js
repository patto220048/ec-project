import express from 'express';
import categoryController from '../controller/category.controller.js';
const router = express.Router();
import verifyToken from '../middlewares/verifyJwt.js';
router.post("/", verifyToken.isAdmin,categoryController.create)
router.delete("/:id", verifyToken.isAdmin,categoryController.delete)
router.put("/:id", verifyToken.isAdmin,categoryController.update)
router.get("/", categoryController.get)

export default router;
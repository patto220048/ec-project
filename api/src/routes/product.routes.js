import express from 'express';
import productController from '../controller/product.controller.js';
import verifyJwt from '../middlewares/verifyJwt.js';
const router = express.Router();

router.get('/', productController.getAll);
router.get('/:slug', productController.getWithSlug);
router.get('/detail/:id', productController.getDetail);
router.get('/v1/tiny', productController.getTiny);
router.get('/v1/count', productController.getCount);
router.get('/v1/featured/:count', productController.getfeatured);
router.post('/', verifyJwt.isAdmin, productController.add);
router.put('/:id', verifyJwt.isAdmin, productController.edit);
router.put('/categories/:id', verifyJwt.isAdmin, productController.addTags);
router.put('/categories/remove/:id', verifyJwt.isAdmin, productController.removeTags);
router.delete('/:id', verifyJwt.isAdmin, productController.detele);
router.put('/images/:id', verifyJwt.isAdmin, productController.addImg);
router.put('/images/remove/:id', verifyJwt.isAdmin, productController.removeImg);

export default router;

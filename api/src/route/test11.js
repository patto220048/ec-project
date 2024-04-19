import express from 'express';
import testController from '../controller/test.controller.js';


const router = express.Router();

router.get('/', testController.testCase);

export default router;

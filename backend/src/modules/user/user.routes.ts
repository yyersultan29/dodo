import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import * as userController from './user.controller';

const router = Router();

router.get('/user/:id', authMiddleware, userController.getUserById);

export default router;

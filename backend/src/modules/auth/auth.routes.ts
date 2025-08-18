import { Router } from 'express';
import * as authController from './auth.controller';

const router = Router();

router.post('/login', authController.login); // authController.login
router.post('/register', authController.register); //authController.register
router.post('/refresh-token', authController.refreshToken); //.refresh-token

export default router;

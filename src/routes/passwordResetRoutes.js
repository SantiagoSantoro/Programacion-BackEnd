import { Router } from 'express';
import {
  renderForgotPassword,
  handleForgotPassword,
  renderResetPassword,
  handleResetPassword,
} from '../controllers/passwordResetController.js';

const router = Router();

router.get('/forgot-password', renderForgotPassword);
router.post('/forgot-password', handleForgotPassword);
router.get('/reset-password/:token', renderResetPassword);
router.post('/reset-password/:token', handleResetPassword);

export default router;

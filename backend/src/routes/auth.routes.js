import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password', 'Minimum of 6 characters').isLength({ min: 6 }),
    body('role').isIn(['student', 'instructor']),
  ],
  register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  login
);

router.post('/forgot-password', [body('email').isEmail()], forgotPassword);
router.post(
  '/reset-password',
  [body('token').notEmpty(), body('newPassword').isLength({ min: 6 })],
  resetPassword
);

export default router;

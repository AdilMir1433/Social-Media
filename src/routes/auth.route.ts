/* eslint-disable import/no-extraneous-dependencies */
import {
  registerHandler,
  loginHandler,
} from '@src/controllers/auth.controller';
import { Router } from 'express';
import { validateFields } from '@src/middleware/validation.middleware';
import { body } from 'express-validator';

const router = Router();

const registrationValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

router.post(
  '/register',
  registrationValidationRules,
  validateFields,
  registerHandler,
);
router.post('/login', loginHandler);

export default router;

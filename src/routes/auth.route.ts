/* eslint-disable import/no-extraneous-dependencies */
import {
  registerHandler,
  loginHandler,
} from '@src/controllers/auth.controller';
import { Router } from 'express';
import { validateFields } from '@src/middleware/validation.middleware';
import {
  registrationValidationRules,
  loginValidationRules,
} from '@src/validators/auth.validator';

const router = Router();

router.post(
  '/register',
  registrationValidationRules,
  validateFields,
  registerHandler,
);
router.post('/login', loginValidationRules, validateFields, loginHandler);

export default router;

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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request or user already exists
 */
router.post(
  '/register',
  registrationValidationRules,
  validateFields,
  registerHandler,
);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Log in a user with the provided email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Bad request or invalid credentials
 */
router.post('/login', loginValidationRules, validateFields, loginHandler);

export default router;

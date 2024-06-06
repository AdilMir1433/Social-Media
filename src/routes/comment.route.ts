import { Router } from 'express';
import {
  createCommentHandler,
  getCommentsByPostIdHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from '@src/controllers/comment.controller';
import { validateFields } from '@src/middleware/validation.middleware';
import {
  createCommentValidationRules,
  commentIdValidationRules,
} from '@src/validators/comment.validator';
import { authenticate } from '@src/middleware/auth.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  createCommentValidationRules,
  validateFields,
  createCommentHandler,
);
router.get(
  '/:id',
  commentIdValidationRules,
  validateFields,
  getCommentsByPostIdHandler,
);
router.put(
  '/:id',
  authenticate,
  commentIdValidationRules,
  validateFields,
  updateCommentHandler,
);
router.delete(
  '/:id',
  authenticate,
  commentIdValidationRules,
  validateFields,
  deleteCommentHandler,
);

export default router;

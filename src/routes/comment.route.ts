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

const router = Router();

router.post(
  '/',
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
  commentIdValidationRules,
  validateFields,
  updateCommentHandler,
);
router.delete(
  '/:id',
  commentIdValidationRules,
  validateFields,
  deleteCommentHandler,
);

export default router;

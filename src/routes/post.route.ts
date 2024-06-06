/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostHandler,
} from '@src/controllers/post.controller';
import { validateFields } from '@src/middleware/validation.middleware';
import {
  createPostValidationRules,
  idValidationRules,
} from '@src/validators/post.validator';
import { authenticate } from '@src/middleware/auth.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  createPostValidationRules,
  validateFields,
  createPostHandler,
);
router.get('/', getAllPostsHandler);
router.get('/:id', authenticate, idValidationRules, getPostByIdHandler);
router.put('/:id', authenticate, idValidationRules, updatePostHandler);
router.delete('/:id', authenticate, idValidationRules, deletePostHandler);

export default router;

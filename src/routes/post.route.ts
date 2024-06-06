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
import { body, param } from 'express-validator';
import { User } from '@src/models/user.model';
import { Post } from '@src/models/post.model';

const router = Router();

export const createPostValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .custom(async (user) => {
      const foundUser = await User.findById(user);
      if (!foundUser) {
        throw new Error('User ID does not exist');
      }
      return true;
    }),
];

export const idValidationRules = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom(async (id) => {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error('Post ID does not exist');
      }
      return true;
    }),
];

router.post('/', createPostValidationRules, validateFields, createPostHandler);
router.get('/', getAllPostsHandler);
router.get('/:id', getPostByIdHandler);
router.put('/:id', updatePostHandler);
router.delete('/:id', deletePostHandler);

export default router;

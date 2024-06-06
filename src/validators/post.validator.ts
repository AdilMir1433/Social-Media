/* eslint-disable import/no-extraneous-dependencies */
import { body, param } from 'express-validator';
import { User } from '@src/models/user.model';
import { Post } from '@src/models/post.model';

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

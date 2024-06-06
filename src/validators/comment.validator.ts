/* eslint-disable import/no-extraneous-dependencies */
import { body, param } from 'express-validator';
import { User } from '@src/models/user.model';
import { Post } from '@src/models/post.model';
import { Comment } from '@src/models/comment.model';

export const createCommentValidationRules = [
  body('content').notEmpty().withMessage('Content is required'),
  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .custom(async (userId) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User ID does not exist');
      }
      return true;
    }),
  body('post')
    .notEmpty()
    .withMessage('Post ID is required')
    .custom(async (postId) => {
      const post = await Post.findById(postId);
      if (!post) {
        throw new Error('Post ID does not exist');
      }
      return true;
    }),
];

export const commentIdValidationRules = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
    .custom(async (id) => {
      const comment = await Comment.findById(id);
      if (!comment) {
        const post = await Post.findById(id);
        if (!post) {
          throw new Error('Comment does not exist');
        }
      }
      return true;
    }),
];

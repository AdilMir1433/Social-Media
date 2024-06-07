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

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment associated with a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request or validation error
 */

router.post(
  '/',
  authenticate,
  createCommentValidationRules,
  validateFields,
  createCommentHandler,
);
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get comments by post ID
 *     description: Retrieve comments associated with a specific post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       400:
 *         description: Bad request or validation error
 */
router.get(
  '/:id',
  commentIdValidationRules,
  validateFields,
  getCommentsByPostIdHandler,
);
/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update a comment
 *     description: Update an existing comment by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Bad request or validation error
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Comment not found
 */
router.put(
  '/:id',
  authenticate,
  commentIdValidationRules,
  validateFields,
  updateCommentHandler,
);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     description: Delete an existing post with the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       400:
 *         description: Bad request or invalid ID
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  authenticate,
  commentIdValidationRules,
  validateFields,
  deleteCommentHandler,
);

export default router;

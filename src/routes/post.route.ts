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

/**
 * @swagger
 * /posts/:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request or validation error
 */
router.post(
  '/',
  authenticate,
  createPostValidationRules,
  validateFields,
  createPostHandler,
);

/**
 * @swagger
 * /posts/:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve all posts
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *       400:
 *         description: Bad request or validation error
 */
router.get('/', getAllPostsHandler);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve a specific post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       400:
 *         description: Bad request or validation error
 */
router.get('/:id', authenticate, idValidationRules, getPostByIdHandler);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     description: Update an existing post with the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Bad request or invalid ID
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, idValidationRules, updatePostHandler);

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
 *     security:
 *       - bearerAuth: []
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
router.delete('/:id', authenticate, idValidationRules, deletePostHandler);

export default router;

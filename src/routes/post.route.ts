import { Router } from 'express';
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostHandler,
} from '@src/controllers/post.controller';

const router = Router();

router.post('/', createPostHandler);
router.get('/', getAllPostsHandler);
router.get('/:id', getPostByIdHandler);
router.put('/:id', updatePostHandler);
router.delete('/:id', deletePostHandler);

export default router;

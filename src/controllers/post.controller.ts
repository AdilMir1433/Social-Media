/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '@src/services/post.service';

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostByIdHandler = async (req: Request, res: Response) => {
  try {
    const post = await getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const userId = (req.user as any)._id;
    const postId = post.user._id;

    if (!userId.equals(postId)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.status(200).json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePostHandler = async (req: Request, res: Response) => {
  try {
    const post = await updatePost(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const userId = (req.user as any)._id;
    const postId = post.user._id;

    if (!userId.equals(postId)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.status(200).json(post);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePostHandler = async (req: Request, res: Response) => {
  try {
    const post = await deletePost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const userId = (req.user as any)._id;
    const { role } = req.user as any;
    const postId = post.user._id;

    if (!userId.equals(postId) && !role.equals('admin')) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

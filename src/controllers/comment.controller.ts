/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from '@src/services/comment.service';

export const createCommentHandler = async (req: Request, res: Response) => {
  try {
    const comment = await createComment(req.body);
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentsByPostIdHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const comments = await getCommentsByPostId(req.params.id);
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCommentHandler = async (req: Request, res: Response) => {
  try {
    const comment = await updateComment(req.params.id, req.body);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const userId = (req.user as any)._id;
    const commentUserId = comment.user._id;

    if (!userId.equals(commentUserId)) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.status(200).json(comment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCommentHandler = async (req: Request, res: Response) => {
  try {
    const comment = await deleteComment(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const userId = (req.user as any)._id;
    const commentUserId = comment.user._id;
    const { role } = req.user as any;

    if (!userId.equals(commentUserId) && !role.equals('admin')) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

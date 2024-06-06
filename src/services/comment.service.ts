import { Comment, IComment } from '@src/models/comment.model';

export const createComment = async (comment: IComment) => {
  const newComment = new Comment(comment);
  const savedComment = await newComment.save();
  return savedComment;
};

export const getCommentsByPostId = async (postId: string) => {
  const comments = await Comment.find({ post: postId });
  return comments;
};

export const updateComment = async (id: string, comment: Partial<IComment>) => {
  const updatedComment = await Comment.findByIdAndUpdate(id, comment, {
    new: true,
  });
  return updatedComment;
};

export const deleteComment = async (id: string) => {
  const deletedComment = await Comment.findByIdAndDelete(id);
  return deletedComment;
};

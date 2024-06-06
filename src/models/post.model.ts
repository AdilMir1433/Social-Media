/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import mongoose, { Schema, Document } from 'mongoose';
import { Comment } from './comment.model';

export interface IPost extends Document {
  title: string;
  content: string;
  user: mongoose.Types.ObjectId;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

PostSchema.pre('findOneAndDelete', async function (next) {
  const postId = this.getQuery()._id;
  await Comment.deleteMany({ post: postId });
  next();
});

export const Post = mongoose.model<IPost>('Post', PostSchema);

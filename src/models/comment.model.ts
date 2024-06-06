import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true },
);

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);

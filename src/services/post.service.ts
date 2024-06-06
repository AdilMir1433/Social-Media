import { Post, IPost } from '@src/models/post.model';

export const createPost = async (post: IPost) => {
  const newPost = new Post(post);
  const createdPost = await newPost.save();
  return createdPost;
};

export const getAllPosts = async () => {
  const posts = await Post.find().populate('user');
  return posts;
};

export const getPostById = async (id: string) => {
  const post = await Post.findById(id).populate('user');
  return post;
};

export const updatePost = async (id: string, post: Partial<IPost>) => {
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  return updatedPost;
};

export const deletePost = async (id: string) => {
  const deletedPost = await Post.findOneAndDelete({ _id: id });
  return deletedPost;
};

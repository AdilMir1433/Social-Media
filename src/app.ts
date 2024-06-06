/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '@src/routes/auth.route';
import postRoutes from '@src/routes/post.route';
import commentRoutes from '@src/routes/comment.route';

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

export { app };

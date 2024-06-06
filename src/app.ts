/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '@src/routes/auth.route';
import postRoutes from '@src/routes/post.route';

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

export { app };

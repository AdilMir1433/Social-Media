/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '@src/routes/auth.route';

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// app.post('/api/users', registerUser);
// app.get('/api/users/:id', getUser);

export { app };

/* eslint-disable import/no-extraneous-dependencies */
import 'module-alias/register';
import { app } from '@src/app';
import { connectDB } from '@src/config';
import * as dotenv from 'dotenv';

import swaggerSpec from '../swagger';

dotenv.config();

const PORT = process.env.PORT || 6969;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    swaggerSpec(app);
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

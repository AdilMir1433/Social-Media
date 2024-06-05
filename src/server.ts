import 'module-alias/register';
import { app } from '@src/app';
import { connectDB } from '@src/config';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 6969;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

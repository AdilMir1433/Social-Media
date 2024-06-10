/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { before, after } from 'node:test';
import { app } from '../src/app';

// let mongoServer: MongoMemoryServer;

// before(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   await mongoose.connect(uri);
// });

// after(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// beforeEach(async () => {
//   const collections = await mongoose.connection.db.collections();

//   for (const collection of collections) {
//     await collection.deleteMany({});
//   }
// });

export const testApp = app;

/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { testApp } from '../test.setup';

let userToken: string;
let postId: string;
let userId: string;

beforeEach(async () => {
  const userRes = await request(testApp).post('/api/auth/register').send({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user',
  });

  userToken = userRes.body.token;
  userId = userRes.body.user._id;

  const postRes = await request(testApp)
    .post('/api/posts')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      title: 'Test Post',
      content: 'This is a test post',
      user: userId,
    });

  postId = postRes.body._id;
});

describe('Comment Routes', () => {
  describe('POST /api/comments', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should create a new comment', async () => {
      const res = await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
          user: userId,
        });

      expect(res.status).toBe(201);
      expect(res.body.content).toBe('This is a test comment');
    });
  });

  describe('GET /api/comments/:postId', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should get comments by post ID', async () => {
      await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
          user: userId,
        });

      const res = await request(testApp).get(`/api/comments/${postId}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].content).toBe('This is a test comment');
    });
  });

  describe('PUT /api/comments/:id', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should update a comment', async () => {
      const commentRes = await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
          user: userId,
        });

      const commentId = commentRes.body._id;
      const res = await request(testApp)
        .put(`/api/comments/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'Updated comment',
        });

      expect(res.status).toBe(200);
      expect(res.body.content).toBe('Updated comment');
    });
  });

  describe('DELETE /api/comments/:id', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should delete a comment', async () => {
      const commentRes = await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
          user: userId,
        });

      const commentId = commentRes.body._id;
      const res = await request(testApp)
        .delete(`/api/comments/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Comment deleted successfully');
    });
  });
});

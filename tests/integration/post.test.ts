/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { testApp } from '../test.setup';

let userToken: string;
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
});

describe('Post Routes', () => {
  describe('POST /api/posts', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should create a new post', async () => {
      const res = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          user: userId,
        });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('Test Post');
      expect(res.body.content).toBe('This is a test post');
    });
  });

  describe('GET /api/posts', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should get all posts', async () => {
      const res = await request(testApp).get('/api/posts');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/posts/:id', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should get a post by ID', async () => {
      const postRes = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          user: userId,
        });

      const postId = postRes.body._id;
      const res = await request(testApp)
        .get(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Test Post');
    });
  });

  describe('PUT /api/posts/:id', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should update a post', async () => {
      const postRes = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          user: userId,
        });

      const postId = postRes.body._id;
      const res = await request(testApp)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Updated Post',
          content: 'This is an updated post',
        });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Post');
    });
  });

  describe('DELETE /api/posts/:id', () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });
    it('should delete a post', async () => {
      const postRes = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          user: userId,
        });

      const postId = postRes.body._id;
      const res = await request(testApp)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Post deleted successfully');
    });
  });
});

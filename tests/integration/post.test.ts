/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import { testApp } from '../test.setup';

let userToken: string;

beforeEach(async () => {
  const userRes = await request(testApp).post('/api/auth/register').send({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user',
  });

  userToken = userRes.body.token;
});

describe('Post Routes', () => {
  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const res = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          userId: 'testUserId',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('title', 'Test Post');
      expect(res.body).to.have.property('content', 'This is a test post');
    });
  });

  describe('GET /api/posts', () => {
    it('should get all posts', async () => {
      const res = await request(testApp).get('/api/posts');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should get a post by ID', async () => {
      const postRes = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          userId: 'testUserId',
        });

      const postId = postRes.body._id;
      const res = await request(testApp).get(`/api/posts/${postId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('title', 'Test Post');
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update a post', async () => {
      const postRes = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          userId: 'testUserId',
        });

      const postId = postRes.body._id;
      const res = await request(testApp)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Updated Post',
          content: 'This is an updated post',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('title', 'Updated Post');
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('should delete a post', async () => {
      const postRes = await request(testApp)
        .post('/api/posts')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Post',
          content: 'This is a test post',
          userId: 'testUserId',
        });

      const postId = postRes.body._id;
      const res = await request(testApp)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Post deleted successfully');
    });
  });
});

/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import { testApp } from '../test.setup';

let userToken: string;
let postId: string;

beforeEach(async () => {
  const userRes = await request(testApp).post('/api/auth/register').send({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user',
  });

  userToken = userRes.body.token;

  const postRes = await request(testApp)
    .post('/api/posts')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      title: 'Test Post',
      content: 'This is a test post',
      userId: 'testUserId',
    });

  postId = postRes.body._id;
});

describe('Comment Routes', () => {
  describe('POST /api/comments', () => {
    it('should create a new comment', async () => {
      const res = await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('content', 'This is a test comment');
    });
  });

  describe('GET /api/comments/:postId', () => {
    it('should get comments by post ID', async () => {
      await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
        });

      const res = await request(testApp).get(`/api/comments/${postId}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.have.property('content', 'This is a test comment');
    });
  });

  describe('PUT /api/comments/:id', () => {
    it('should update a comment', async () => {
      const commentRes = await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
        });

      const commentId = commentRes.body._id;
      const res = await request(testApp)
        .put(`/api/comments/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'Updated comment',
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('content', 'Updated comment');
    });
  });

  describe('DELETE /api/comments/:id', () => {
    it('should delete a comment', async () => {
      const commentRes = await request(testApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is a test comment',
          post: postId,
        });

      const commentId = commentRes.body._id;
      const res = await request(testApp)
        .delete(`/api/comments/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        'message',
        'Comment deleted successfully',
      );
    });
  });
});

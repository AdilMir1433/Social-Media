/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { expect } from 'chai';
import { testApp } from '../test.setup';

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(testApp).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
    });

    it('should not register a user with an existing email', async () => {
      await request(testApp).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });

      const res = await request(testApp).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      await request(testApp).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });

      const res = await request(testApp).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });

    it('should not login a non-existing user', async () => {
      const res = await request(testApp).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Invalid email or password');
    });
  });
});

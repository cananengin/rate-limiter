const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./index');
const ipLimiter = require('./src/middlewares/ipLimiter');


describe('Public Routes', () => {
  beforeAll(() => {
    ipLimiter.consume = jest.fn().mockResolvedValue();
  });

  it('should return 200 and public data', async () => {
    const res = await request(server).get('/public');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Public data');
  });

  it('should return 429 when rate limit is exceeded', async () => {
    ipLimiter.consume.mockRejectedValue({ msBeforeNext: 1000 });
    const res = await request(server).get('/public');
    expect(res.statusCode).toEqual(429);
    expect(res.body).toHaveProperty('error', 'IP limit exceeded');
  });

  afterAll(async () => {
    ipLimiter.consume.mockRestore();
    await mongoose.connection.close();
    server.close();
  });
});
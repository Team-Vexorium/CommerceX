const request = require('supertest');
const app = require('./app');

describe('app', () => {
  it('returns health status', async () => {
    const response = await request(app).get('/api/v1/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('enforces csrf token on POST', async () => {
    const response = await request(app)
      .post('/api/v1/auth/forgot-password')
      .send({ email: 'test@example.com' });

    expect(response.statusCode).toBe(403);
  });
});

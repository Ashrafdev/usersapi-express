const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  let createdUserId;

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ id: '1', name: 'John Doe', email: 'john@example.com' });
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe('1');
    createdUserId = response.body.id;
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('should update a user', async () => {
    const response = await request(app)
      .put(`/users/${createdUserId}`)
      .send({ name: 'Updated Name' });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Updated Name');
  });

  it('should delete a user', async () => {
    const response = await request(app).delete(`/users/${createdUserId}`);
    expect(response.statusCode).toBe(204);
  });

  it('should handle non-existent user deletion', async () => {
    const response = await request(app).delete(`/users/nonexistent`);
    expect(response.statusCode).toBe(404);
  });
});

import createApp from '../app.express';
import { seedUsers } from '../seed/test.seed';
import request from 'supertest';

describe('userRoute', () => {
  const app = createApp();

  test('invoke user list', async (done) => {
    // Arrange
    const expectCategories = seedUsers;
    const url = encodeURI('/auth/login');

    // Act
    const response = await request(app).post(url).send({
      email: 'nagorimohit21@gmail.com',
      password: 'mohit#2608',
    });
    const token = response.body.token;

    // Assert
    expect(token).not.toBeNull();
    done();
  });
});

import request from 'supertest';

import App from '../app';
import { CreateAccountDTO } from '../dtos/account.dto';
import { AuthRoute } from '../routes/auth.route';
let app;
beforeAll(async () => {
  app = new App();
});
afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  await app.closeDatabase();
});

describe('Testing Auth', () => {
  afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  });
  describe('[POST] /signup', () => {
    it('response should have the Create Account', async () => {
      const account: CreateAccountDTO = {
        username: 'namnhatwtf',
        email: 'ghetsuphanboi@gmail.com',
        password: 'Admin@admin123',
        phone: '0386487071',
      };
      const authRoute = new AuthRoute();
      const Account = authRoute.authController.authService.Account;
      Account.findOne = jest.fn().mockReturnValue(null);
      Account.create = jest.fn().mockReturnValue({
        id: 1,
        email: account.email,
        phone: account.phone,
        username: account.username,
        password: account.password,
      });
      const res = await request(app.getServer())
        .post('/api/v1/auth/signup')
        .send({
          email: account.email,
          phone: account.phone,
          username: account.username,
          password: account.password,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('signup_successfully');
    });
  });
});

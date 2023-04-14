import request from 'supertest';
import { hashSync } from 'bcrypt';

import App from '../app';
import { CreateAccountDTO } from '../dtos/account.dto';
import { AuthRoute } from '../routes/auth.route';
import { generateAccessToken } from './../utils/jwt.util';

const accountJest = (account) => {
  return jest.fn().mockReturnValue({
    email: account.email,
    phone: account.phone,
    username: account.username,
    password: hashSync(account.password, 10),
  });
};
const account = {
  username: 'namnhatwtf',
  email: 'ghetsuphanboi@gmail.com',
  password: 'Admin@admin123',
  phone: '0386487071',
  role_id: 1,
};

describe('Testing Account', () => {
  let app;
  let Account, Token, accessToken;
  beforeAll(async () => {
    app = new App();
    const authRoute = new AuthRoute();
    Account = authRoute.authController.authService.Account;
    Account.create = await accountJest(account);
    Token = authRoute.authController.authService.Token;
    accessToken = await generateAccessToken({ account_id: 'namnhatwtf' });
    Token.create = jest.fn().mockReturnValue({
      accessToken,
      account_id: 'namnhatwtf',
    });
  });
  describe('[POST] /createAccount', () => {
    it('response new account after Create Account', async () => {
      Account.findOne = jest.fn().mockReturnValue(null);
      Account.create = accountJest(account);
      accessToken = await generateAccessToken({ account_id: 'namnhatwtf' });
      Token.create = jest.fn().mockReturnValue({
        accessToken,
      });
      const res = await request(app.getServer())
        .post('/api/v1/account/create')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: account.email,
          phone: account.phone,
          username: account.username,
          password: account.password,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('signup_successfully');
    });
    it('response new error exist account after Create Account', async () => {
      const account: CreateAccountDTO = {
        username: 'namnhatwtf',
        email: 'ghetsuphanboi@gmail.com',
        password: 'Admin@admin123',
        phone: '0386487071',
      };
      Account.findOne = accountJest(account);
      Account.create = accountJest(account);
      const res = await request(app.getServer())
        .post('/api/v1/account/create')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          email: account.email,
          phone: account.phone,
          username: account.username,
          password: account.password,
        });
      expect(res.statusCode).toEqual(409);
      expect(res.text).toContain('Already exists');
    });
  });
});

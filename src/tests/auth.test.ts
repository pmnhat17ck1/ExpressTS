import request from 'supertest';
import { hashSync } from 'bcrypt';

import App from '../app';
import { CreateAccountDTO, LoginAccountDTO } from '../dtos/account.dto';
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

describe('Testing Auth', () => {
  let app;
  let Account, Token, accessToken;
  beforeAll(async () => {
    app = new App();
    const authRoute = new AuthRoute();
    Account = authRoute.authController.authService.Account;
    Token = authRoute.authController.authService.Token;
  });
  describe('[POST] /signup', () => {
    it('response error after create without accountData', async () => {
      Account.findOne = jest.fn().mockReturnValue(null);
      Account.create = jest.fn().mockReturnValue({});
      const res = await request(app.getServer())
        .post('/api/v1/auth/signup')
        .send(undefined);
      expect(res.statusCode).toEqual(400);
      expect(res.text).toContain(
        'email must be an email, username must be a string, password is not strong enough,password must be a string, phone must be a valid phone number'
      );
    });
    it('response new account after Create Account', async () => {
      const account: CreateAccountDTO = {
        username: 'namnhatwtf',
        email: 'ghetsuphanboi@gmail.com',
        password: 'Admin@admin123',
        phone: '0386487071',
      };
      Account.findOne = jest.fn().mockReturnValue(null);
      Account.create = accountJest(account);
      accessToken = await generateAccessToken({ account_id: 'namnhatwtf' });
      Token.create = jest.fn().mockReturnValue({
        accessToken,
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
        .post('/api/v1/auth/signup')
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
  describe('[POST] /login', () => {
    it('response account after login Account', async () => {
      const account: LoginAccountDTO = {
        username: 'namnhatwtf',
        password: 'Admin@admin123',
      };
      Account.findOne = accountJest(account);
      Token.findOne = jest.fn().mockReturnValue({
        accessToken,
        save: jest.fn(),
      });

      const res = await request(app.getServer())
        .post('/api/v1/auth/login')
        .send({
          username: account.username,
          password: account.password,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('login_successfully');
    });
  });
});

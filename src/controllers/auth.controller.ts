import { Request, Response } from 'express';

import { CreateAccountDTO, LoginAccountDTO } from '@dtos/account.dto';
import { AccountI } from '@interfaces/account.interface';
import { isEmailOrPhone } from '@/utils/util';
import { validator } from '@/utils/index';
import { response } from '@/utils/response.util';
import { randomCode, expiredTime } from '@/utils/common.util';
import { EmailService } from '@/services/systems';
import db from '@/models';
const { Account, ForgotPassword } = db;
import AuthService from '@/services/apis/auth.service';

class AuthController {
  public authService = new AuthService();
  public logIn = async (req: Request, res: Response): Promise<void> => {
    const accountData: LoginAccountDTO = req.body;
    const { username } = accountData;
    const input = { email: '', username: '', phone: '' };
    switch (isEmailOrPhone(username)) {
      case 'phone':
        await validator.validates.Empty(req, 'username', 'số điện thoại');
        await validator.validates.Phone(req);
        input['phone'] = username;
        break;
      case 'email':
        await validator.validates.Empty(req, 'username', 'email');
        await validator.validates.Email(req);
        input['email'] = username;
        break;
      default:
        await validator.validates.Empty(req, 'username', 'username');
        await validator.validates.Username(req);
        input['username'] = username;
        break;
    }
    const result = validator.validateErrors(req);
    if (result?.length) {
      response(res, 422, result);
      return;
    }
    const dataCustom = {
      ...accountData,
      email: input.email,
      username: input.username,

      phone: input.phone,
    };

    try {
      const { accessToken, refreshToken, findAccount } =
        await this.authService.login(dataCustom);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      response(res, 203, findAccount, 'login_success');
    } catch (error) {
      response(res, 500, error);
    }
  };

  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const accountData: CreateAccountDTO = req.body;
      const signUpAccountData: AccountI = await this.authService.signup(
        accountData
      );
      response(res, 200, signUpAccountData, 'signup_success');
    } catch (error) {
      response(
        res,
        500,
        error?.errors?.map((item) => {
          return { message: item?.message };
        })
      );
    }
  };

  public logOut = async (req: Request, res: Response): Promise<void> => {
    res.setHeader('Authorization', '');
    res.clearCookie('refreshToken');
    response(res, 200, 'logout_success');
  };

  public ForgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const account = await Account.findOne({ where: { email } });
    if (!account) {
      return response(res, 404);
    }
    const token = randomCode();
    const expires = expiredTime('5m');
    await ForgotPassword.create({
      email,
      token,
      expires,
      account_id: account.id,
    });
    await EmailService.getInstance().sendEmail(
      email,
      'forgot password',
      `The code for forgot password: ${token}`
    );
    response(res, 200, 'email_sent_successfully');
  };
  public ResetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    const forgotPassword = await ForgotPassword.findOne({ where: { token } });
    if (!forgotPassword) {
      return response(res, 404, 'invalid_token');
    }
    if (new Date() > forgotPassword.expires) {
      await forgotPassword.destroy();
      return response(res, 404, 'token_has_expired');
    }
    const account = await Account.findOne({
      where: { email: forgotPassword.email },
    });

    if (!account) {
      await forgotPassword.destroy();
      return response(res, 404, 'user_not_found');
    }

    await account.update({ password: newPassword });
    await forgotPassword.destroy();
    response(res, 200, 'password_updated_successfully');
  };
}

export { AuthController };

import { Request, Response, NextFunction } from 'express';

import { CreateAccountDTO } from '@dtos/account.dto';
import { AccountI } from '@interfaces/account.interface';
import { isEmailOrPhone } from '@/utils/util';
import { validator } from '@/utils/index';
import { response } from '@/utils/response.util';
import AuthService from '@/services/apis/auth.service';

class AuthController {
  public authService = new AuthService();
  public logIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const accountData = req.body;
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
      response(res, 200, findAccount, 'login_successfully');
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const accountData: CreateAccountDTO = req.body;
      const signUpAccountData: AccountI = await this.authService.signup(
        accountData
      );
      response(res, 200, signUpAccountData, 'signup_successfully');
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.setHeader('Authorization', '');
      res.clearCookie('refreshToken');
      response(res, 200, 'logout_successfully');
    } catch (error) {
      next(error);
    }
  };

  public ForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const accountData = req.body;
    try {
      await this.authService.forgotPassword(accountData);
      response(res, 200, 'sent_successfully');
    } catch (error) {
      next(error);
    }
  };
  public ResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const accountData = req.body;
    try {
      await this.authService.resetPassword(accountData);
      response(res, 200, 'updated_successfully');
    } catch (error) {
      next(error);
    }
  };
}

export { AuthController };

import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { compareSync } from 'bcrypt';

import { LoginAccountDTO } from '@dtos/account.dto';

import { isEmailOrPhone } from '@/utils/util';
import { jwt, validator } from '@/utils/index';
import { response } from '@/utils/response.util';

import db from '@/models';
const { Account, Token, Country, Role } = db;

class AuthController {
  public logIn = async (req: Request, res: Response): Promise<void> => {
    const { username, password }: LoginAccountDTO = req.body;
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
    try {
      const account = await Account.findOne({
        where: {
          [Op.or]: [
            { email: input.email },
            { username: input.username },
            { phone: input.phone },
          ],
        },
        include: [
          {
            model: Country,
            as: 'country',
          },
          {
            model: Role,
            as: 'role',
          },
        ],
        attributes: {
          exclude: [
            'countryId',
            'roleId',
            'CountryId',
            'RoleId',
            'created_at',
            'updated_at',
            'createdAt',
            'updatedAt',
          ],
        },
      });

      if (!account) {
        return response(res, 404);
      }
      if (!compareSync(password, account.password)) {
        return response(res, 401, 'incorrect_password');
      }
      let tokenAccess;
      const tokenAccount = await Token.findOne({
        where: {
          account_id: account.id,
        },
      });
      tokenAccess = tokenAccount?.accessToken;
      const newAccessToken = jwt.generateAccessToken({
        account_id: account?.id,
      });
      const newRefreshToken = jwt.generateRefreshToken({
        account_id: account?.id,
      });
      if (!tokenAccess) {
        tokenAccount.update({
          accessToken: newAccessToken,
        });
        tokenAccess = newAccessToken;
      }
      const payload = jwt.verifyToken(tokenAccess);
      if (jwt.checkExpiredToken(payload.exp)) {
        tokenAccount.update({
          accessToken: newAccessToken,
        });
        tokenAccess = newAccessToken;
      }
      tokenAccount.save();
      res.setHeader('Authorization', `Bearer ${tokenAccess}`);
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      response(res, 203, account, 'login_success');
    } catch (error) {
      response(res, 500, error);
    }
  };
  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, username, phone, password } = req.body;

      const newAccount = await Account.create({
        username,
        email,
        phone,
        password,
        is_active: false,
        role_id: 1,
        country_id: 1,
      });

      const accessToken = jwt.generateAccessToken({
        account_id: newAccount?.id,
      });
      const refreshToken = jwt.generateRefreshToken(
        { account_id: newAccount?.id },
        '3h'
      );
      await Token.create({
        account_id: newAccount.id,
        accessToken,
        refreshToken,
        type: 'auth',
      });
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });
      response(res, 200, 'signup_success');
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
}

export { AuthController };

import { Request, Response } from 'express';

import { CreateAccountDTO, UpdateAccountDTO } from '@/dtos/account.dto';
import { AccountI } from '@/interfaces/account.interface';
import { jwt } from '@/utils/index';
import { response } from '@/utils/response.util';

import db from '@/models';
const { Account, Token, Country, Role } = db;
//products/:id/ratings
class AccountController {
  // admin
  public getAllAccount = async (req: any, res: Response): Promise<void> => {
    try {
      const accounts: AccountI = await Account.findAll({
        where: {},
      });
      response(res, 200, accounts, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  // guest
  public getAccountById = async (req: any, res: Response): Promise<void> => {
    try {
      const account_id = req.params.account_id;
      const account: AccountI = await Account.findByPk(account_id, {
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
            'password',
            'countryId',
            'roleId',
            'CountryId',
            'RoleId',
            'createdAt',
            'updatedAt',
          ],
        },
      });
      if (!account) {
        return response(res, 404);
      }
      response(res, 200, account, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public createAccount = async (req: any, res: Response): Promise<void> => {
    try {
      const { email, username, phone, password }: CreateAccountDTO = req.body;

      const newAccount: AccountI = await Account.create({
        username,
        email,
        phone,
        password,
        role_id: 2,
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
        type: 'account',
      });
      response(res, 200, 'signup_success');
    } catch (error) {
      response(res, 500);
    }
  };
  public updateAccount = async (req: any, res: Response): Promise<void> => {
    try {
      const { email, username, phone, password, is_active }: UpdateAccountDTO =
        req.body;
      const account_id = req.params.account_id;
      const account: AccountI = await Account.update(
        {
          email,
          username,
          phone,
          password,
          is_active,
        },
        {
          where: {
            id: account_id,
          },
        }
      );
      if (!account) {
        return response(res, 404);
      }
      response(res, 200, account, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const account_id = req.params.account_id;
      const addressFound = await Account.findByPk(account_id);
      if (!addressFound) {
        return response(res, 404);
      }
      await addressFound.destroy();
      response(res, 200, 'successfully');
    } catch (error) {
      response(res, 500);
    }
  };
}
export { AccountController };

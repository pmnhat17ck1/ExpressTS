import { Request, Response } from 'express';
import { Op } from 'sequelize';

import db from '@models/index';
const { Account, SocialAccount, Token } = db;

import { response } from '@/utils/response.util';
import { jwt } from '@/utils';
class SocialAccountController {
  constructor(parameters) {}
  socialLogin = async (req: Request, res: Response) => {
    try {
      const { provider, socialId, email, phoneNumber } = req.body;
      // Xác thực user bằng SocialAccount và trả về dữ liệu tài khoản
      const socialAccount = await SocialAccount.findOne({
        where: { provider, socialId },
      });
      if (!socialAccount) {
        return response(res, 400);
      }
      const account = await Account.findOne({
        where: { [Op.or]: [{ email }, { phoneNumber }] },
      });
      let accessToken, refreshToken;
      if (!account) {
        // Nếu chưa có tài khoản bình thường, tạo mới và liên kết với SocialAccount
        const newAccount = await Account.create({
          username: phoneNumber,
          email,
          phoneNumber,
          password: '',
          isActive: true,
          role_id: 2,
          country_id: 1,
        });
        await socialAccount.setAccount(newAccount);
        accessToken = jwt.generateAccessToken({ account_id: newAccount.id });
        refreshToken = jwt.generateRefreshToken({ account_id: newAccount.id });
        await Token.create({
          account_id: newAccount.id,
          accessToken,
          refreshToken,
          type: 'social-account',
        });
      }
      await socialAccount.setAccount(account);
      accessToken = jwt.generateAccessToken({ account_id: account.id });
      refreshToken = jwt.generateRefreshToken({ account_id: account.id });
      let tokenAccess;
      const tokenAccount = await Token.findOne({
        where: {
          account_id: account.id,
        },
      });
      tokenAccess = tokenAccount?.accessToken;
      if (!tokenAccess) {
        tokenAccount.update({
          accessToken: accessToken,
        });
        tokenAccess = accessToken;
      }
      const payload = jwt.verifyToken(tokenAccess);
      if (jwt.checkExpiredToken(payload.exp)) {
        tokenAccount.update({
          accessToken: accessToken,
        });
        tokenAccess = refreshToken;
      }
      tokenAccount.save();
      return response(res, 200, account);
    } catch (error) {
      return response(res, 500);
    }
  };
  linkSocial = async (req: any, res: Response) => {
    try {
      const { provider, social_id } = req.body;
      if (!provider || !social_id) {
        return response(res, 400, 'Provider and socialId are required');
      }
      const linkedSocialAccount = await SocialAccount.findOne({
        where: { provider, social_id, account_id: req.account.id },
      });
      if (linkedSocialAccount) {
        return response(res, 409, 'Social account already linked');
      }
    await SocialAccount.create({
        provider,
        social_id,
        account_id: req.account.id,
      });
      return response(res, 200, 'Social account linked successfully');
    } catch (error) {
      return response(res, 500);
    }
  };
  socialAccounts = async (req: any, res: Response) => {
    try {
      const socialAccounts = await SocialAccount.findAll({where: {account_id: req.account.id}});
      return response(res, 200, socialAccounts);
    } catch (err) {;
      return response(res, 500);
    }
  };
}


export default {
  SocialAccountController,
};

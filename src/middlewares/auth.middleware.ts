import { Response, NextFunction } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import db from '../models';
import { generateAccessToken } from '../utils/generate.util';
import { verifyToken } from '../utils/common.util';
import { response } from '../utils/response.util';

const { Account, Token } = db;
export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return response(res, 500, 'authorization_header_not_found');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return response(res, 404, 'token_not_found');
    }
    let payload = null;
    let account = {};
    try {
      payload = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
      account = await Account.findByPk(payload.account_id);
      if (!account) {
        return response(res, 401);
      }
      req.account = account;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        const newAccessToken = generateAccessToken({
          account_id: payload.account_id,
        });
        const getToken = await Token.findOne({
          where: {
            accessToken: token,
          },
        });
        await getToken.update({
          accessToken: newAccessToken,
        });
        if (!getToken) {
          await Token.create({
            account_id: req.account.id,
            accessToken: newAccessToken,
          });
        }
      } else {
        return response(res, 422, 'invalid_token');
      }
    }
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return response(res, 422, 'invalid_token');
    }
    return response(res, 500);
  }
};

export default { authenticate };

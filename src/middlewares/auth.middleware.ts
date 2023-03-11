import { Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import db from '../models';
import { verifyToken } from '../utils/jwt.util';
import { response } from '../utils/response.util';

const { Account } = db;
export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let payload;
  let foundAccount;
  try {
    const Authorization =
      req.cookies['Authorization'] ||
      (req.header('Authorization')
        ? req.header('Authorization').split('Bearer ')[1]
        : null);
    if (Authorization) {
      payload = verifyToken(Authorization, process.env.ACCESS_TOKEN_SECRET);
      foundAccount = await Account.findByPk(payload.account_id);
      if (foundAccount) {
        req.account = foundAccount;
        req.account_id = foundAccount?.id;
        next();
      } else {
        next(response(res, 401));
      }
    } else {
      next(response(res, 404));
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      next(response(res, 422, 'invalid_token'));
    }
  }
};

export const authenticateAdmin = (req: any, res: any, next: any): any => {
  authenticate(req, res, () => {
    if (req.user.role_id == 1) {
      next();
    } else {
      response(res, 403, "You're not allowed to do that!");
    }
  });
};

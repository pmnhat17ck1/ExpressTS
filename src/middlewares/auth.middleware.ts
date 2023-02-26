import { Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import db from "../models";
import { generateAccessToken } from "../utils/generate.util";
import { verifyToken } from "../utils/common.util";

const { Account, Token } = db;
export const authenticate = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header not found");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token not found");
    }
    let payload = null;
    let account = {};
    try {
      payload = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
      account = await Account.findByPk(payload.account_id);
      if (!account) {
        return res.status(401).json({ message: "Unauthorized" });
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
          raw: true,
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
        throw new Error("Invalid token");
      }
    }
    req.account = account;
    return next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(400).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Server error" });
  }
};

export default { authenticate };

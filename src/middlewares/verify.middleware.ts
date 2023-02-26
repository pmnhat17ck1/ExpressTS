import jwt from "jsonwebtoken";
import db from "../models";
import { checkExpiredToken } from "../utils/common.util";

const verifyToken = (req: any, res: any, next: any): any => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const serectKey = process.env.ACCESS_TOKEN_SECRET;
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, serectKey ?? "", async (err: any, item: any) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        const account = await db.Account.findOne({
          where: {
            id: item.account_id,
          },
          raw: true,
        });
        if (!account) {
          return res.status(500).json("You're not authenticated!");
        }
        req.account = account;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  } catch (error) {
    console.log("verifyToken-error", error);
  }
};

const verifyTokenRefresh = (req: any, res: any, next: any): any => {
  // ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  try {
    const codeRefresh = req.cookies.refreshToken || "";
    const serectKey = process.env.JWT_REFRESH_KEY;
    const refreshToken = codeRefresh || codeRefresh.split(" ")[1];
    if (codeRefresh) {
      jwt.verify(refreshToken, serectKey ?? "", async (err: any, item: any) => {
        if (err) {
          return res.status(403).json("Refresh token is not valid!");
        }
        const refreshExpired = checkExpiredToken(item?.exp);
        if (refreshExpired) {
          return res.status(500).json("Refresh token was expired!");
        }
        req.account_id = item.account_id;
        next();
      });
    } else {
      res.status(401).json("You're not authenticated");
    }
  } catch (error) {
    console.log("verifyTokenRefresh-error", error);
  }
};

const verifyTokenAndUserAuthorization = (
  req: any,
  res: any,
  next: any
): any => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req: any, res: any, next: any): any => {
  verifyToken(req, res, () => {
    if (req.user.roleId === 1) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

export {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
  verifyTokenRefresh,
};

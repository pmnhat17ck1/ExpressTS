import jwt from "jsonwebtoken";
import { User } from "../models";
import { checkExpiredToken } from "../utils/common.util";

const verifyToken = (req: any, res: any, next: any): any => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const serectKey = process.env.JWT_ACCESS_KEY;
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, serectKey ?? "", async (err: any, item: any) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        const user = await User.findOne({
          where: {
            id: item.user_id,
          },
          raw: true,
        });
        if (!user) {
          return res.status(500).json("You're not authenticated!");
        }
        req.user = user;
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
        req.user_id = item.user_id;
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

const verifyAdmin = (req: any, res: any, next: any): any => {};

export {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
  verifyTokenRefresh,
  verifyAdmin,
};

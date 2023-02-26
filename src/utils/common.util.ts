import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import bcrypt from "bcrypt";
import config from "../config";

export const apiLimiter = (
  time = 60 * 1000,
  maxReq = 10,
  msg = {
    success: false,
    message: "Fail!",
    data: "Too many requests, please try again after a few minutes.",
  }
): any =>
  rateLimit({
    windowMs: time, // 1 minutes
    max: maxReq, // Limit each IP to 10 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    statusCode: 429,
    message: msg,
  });

export const hashPassword = async (password: string): Promise<any> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
export const comparePassword = (
  password1: string,
  password2: string
): Promise<any> => bcrypt.compare(password1, password2);

export const decodedToken = (token: any): any => {
  const decoded = jwt.decode(token, {
    complete: true,
  });
  if (decoded == null) {
    throw new Error(`provided token does not decode as JWT`);
  }
  return decoded?.payload;
};

export const verifyToken = (token: any, key = config.JWT_SECRET): any => {
  const decoded: any = jwt.verify(token, key);
  const isError = [null, undefined, "", {}, NaN].includes(decoded);
  if (isError) {
    throw new Error(`provided token does not decode as JWT`);
  }
  return decoded;
};

function convertToCamelCase(str: string) {
  let result = str.replace(".model.ts", "").replace(/-/g, " ");
  result = result.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/ /g, "");
  return result;
}

export const checkExpiredToken = (exp = 0): any => Date.now() >= exp * 1000;

export default {
  apiLimiter,
  hashPassword,
  comparePassword,
  decodedToken,
  checkExpiredToken,
  convertToCamelCase,
};

export const getAppVersion = (version) => {
  const versionArray = version.split(".");
  const appVersion = versionArray[0];
  return "v" + appVersion;
};

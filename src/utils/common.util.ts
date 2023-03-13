import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import { isString } from './util';
export const apiLimiter = (
  time = 60 * 1000,
  maxReq = 60,
  msg = {
    success: false,
    message: 'Too many requests, please try again after a few minutes!',
  }
): any =>
  rateLimit({
    windowMs: time, // 1 phút
    max: maxReq, // Giới hạn 1000 yêu cầu
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    statusCode: 429,
    message: msg,
  });

export const decodedToken = (token: any): any => {
  const decoded = jwt.decode(token, {
    complete: true,
  });
  if (decoded == null) {
    throw new Error(`provided token does not decode as JWT`);
  }
  return decoded?.payload;
};

export const getAppVersion = (version) => {
  const versionArray = version.split('.');
  const appVersion = versionArray[0];
  return 'v' + appVersion;
};

export const randomCode = (randombytes = 3, type: any = 'hex') =>
  crypto.randomBytes(randombytes).toString(type).toUpperCase();

export const expiredTime = (time) => {
  const now = new Date();
  let expirationTime;
  if (!isString(time)) {
    return now.getTime() + time;
  }
  const [value, unit] = time.match(/[a-zA-Z]+|[0-9]+/g);

  switch (unit) {
    case 's':
      expirationTime = now.getTime() + value * 1000;
      break;
    case 'm':
      expirationTime = now.getTime() + value * 60 * 1000;
      break;
    case 'h':
      expirationTime = now.getTime() + value * 60 * 60 * 1000;
      break;
    case 'd':
      expirationTime = now.getTime() + value * 24 * 60 * 60 * 1000;
      break;
    case 'M':
      expirationTime = new Date(
        now.getFullYear(),
        now.getMonth() + value,
        now.getDate()
      ).getTime();
      break;
    case 'y':
      expirationTime = new Date(
        now.getFullYear() + value,
        now.getMonth(),
        now.getDate()
      ).getTime();
      break;
    default:
      throw new Error(`Invalid unit: ${unit}`);
  }

  return new Date(expirationTime);
};

export default {
  apiLimiter,
  decodedToken,
  getAppVersion,
  randomCode,
};

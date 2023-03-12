import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

export const apiLimiter = (
  time = 60 * 1000,
  maxReq = 60,
  msg = {
    success: false,
    message: 'Fail!',
    data: 'Too many requests, please try again after a few minutes.',
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

export default {
  apiLimiter,
  decodedToken,
};

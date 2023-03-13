import jwt from 'jsonwebtoken';

export const generateAccessToken = (object = {}, exp = '30d'): any => {
  const accessKey = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign(
    {
      ...object,
    },
    accessKey ?? '',
    { expiresIn: exp }
  );
};

export const generateRefreshToken = (object = {}, exp = '60s'): any => {
  const refreshKey = process.env.REFRESH_TOKEN_SECRET;
  return jwt.sign(
    {
      ...object,
    },
    refreshKey ?? '',
    { expiresIn: exp }
  );
};

export const verifyToken = (
  token: any,
  key = process.env.ACCESS_TOKEN_SECRET
): any => {
  const decoded: any = jwt.verify(token, key);
  const isError = [null, undefined, '', {}, NaN].includes(decoded);
  if (isError) {
    throw new Error(`provided token does not decode as JWT`);
  }
  return decoded;
};

export const checkExpiredToken = (exp = 0): any => Date.now() >= exp * 1000;

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  checkExpiredToken,
};

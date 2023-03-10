import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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

export const randomHexCode = (randombytes: any, type: any) =>
  crypto
    .randomBytes(randombytes || 3)
    .toString(type || 'hex')
    .toUpperCase();

export default {
  generateAccessToken,
  generateRefreshToken,
  randomHexCode,
};

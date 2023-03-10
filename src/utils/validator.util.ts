import { check, validationResult } from 'express-validator';
import { capitalizeFirstLetter } from './util';

const validates = {
  Empty: async (req, type = 'username', text = 'email') => {
    await check(type, `${capitalizeFirstLetter(text)} không được bỏ trống`)
      .notEmpty()
      .run(req);
  },
  Email: async (req, type = 'username') => {
    await check(type, `Email không hợp lệ`).isEmail().run(req);
  },
  Phone: async (req, type = 'username') => {
    await check(type, `Số điện thoại không hợp lệ`)
      .isMobilePhone('vi-VN')
      .run(req);
  },
  Username: async (req, type = 'username') => {
    await check(type, 'Username phải không có ký tự đặc biệt')
      .isAlphanumeric()
      .run(req);
    await check(type, 'Username phải từ 5 đến 20 ký tự')
      .isLength({ min: 5, max: 20 })
      .run(req);
  },
};
const validateErrors = (req) => {
  const errors: any = validationResult(req);
  let result = [];
  if (!errors.isEmpty()) {
    result = errors.array().map((item) => {
      return { message: item?.msg };
    });
  }
  return result;
};

export { validates, validateErrors };
export default {
  validates,
  validateErrors,
};

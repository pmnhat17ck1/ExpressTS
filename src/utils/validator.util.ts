import { check, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";
import { Response } from "express";

const Auth = {
  Register: () => [
    check("username", "Username does not Empty").notEmpty(),
    check("username", "Username must be Alphanumeric").isAlphanumeric(),
    check("username", "Username more than 6 degits").isLength({ min: 6 }),
    check("email", "Invalid does not Empty").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("birthday", "Invalid does not Empty").notEmpty(),
    check("birthday", "Invalid birthday").matches(
      /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/
    ),
    check("password", "Invalid does not Empty").isLength({ min: 6 }),
    check("password", "Password more than 6 degits").isLength({ min: 6 }),
  ],
  Login: () => [
    check("username", "Invalid does not Empty").notEmpty(),
    check("username", "Username more than 5 degits").isLength({ min: 5 }),
    check("password", "Invalid does not Empty").notEmpty(),
    check("password", "Password more than 6 degits").isLength({ min: 6 }),
  ],
  Forgotpassword: () => [
    check("email", "Invalid does not Empty").notEmpty(),
    check("email", "Invalid email").isEmail(),
  ],
};

const validates = {
  Auth,
};

const errors = (req: Request, res: Response) => {
  const errorsValidate = validationResult(req);
  if (!errorsValidate.isEmpty()) {
    return res.status(422).json({ errors: errorsValidate.array() });
  }
  return errorsValidate;
};

export { validates, errors };
export default {
  validates,
  errors,
};

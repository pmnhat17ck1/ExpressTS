import { Request, Response } from "express";
import { Op } from "sequelize";
import { compareSync } from "bcrypt";

import db from "@/models";
import { isEmailOrPhone } from "@/utils/util";
import { generate, validator, response } from "@/utils/index";
const { Account, AccountRole, AccountCountry, Token } = db;

const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const input = { email: "", username: "", phone: "" };

  switch (isEmailOrPhone(username)) {
    case "phone":
      await validator.validates.Empty(req, "username", "số điện thoại");
      await validator.validates.Phone(req);
      input["phone"] = username;
      break;
    case "email":
      await validator.validates.Empty(req, "username", "email");
      await validator.validates.Email(req);
      input["email"] = username;
      break;
    default:
      await validator.validates.Empty(req, "username", "username");
      await validator.validates.Username(req);
      input["username"] = username;
      break;
  }
  const result = validator.validateErrors(req);
  if (result?.length) {
    response.response(res, 422, result);
    return;
  }
  try {
    const account = await Account.findOne({
      where: {
        [Op.or]: [
          { email: input.email },
          { username: input.username },
          { phone: input.phone },
        ],
      },
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    if (!account) {
      return response.response(res, 404, "user_not_found");
    }
    if (!compareSync(password, account.password)) {
      return response.response(res, 401, "incorrect_password");
    }
    let tokenAccess;
    const tokenAccount = await Token.findOne({
      where: {
        account_id: account.id,
      },
    });
    tokenAccess = tokenAccount?.accessToken;

    if (!tokenAccess) {
      const newAccessToken = generate.generateAccessToken({
        account_id: account?.id,
      });
      tokenAccount.update({
        accessToken: newAccessToken,
      });
      tokenAccess = newAccessToken;
    }
    const newRefreshToken = generate.generateRefreshToken({
      account_id: account?.id,
    });
    res.setHeader("Authorization", `Bearer ${tokenAccess}`);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    response.response(res, 203, "login_success");
  } catch (error) {
    response.response(res, 500, error);
  }
};

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, username, phone, password } = req.body ?? {};

  try {
    const newUser = await Account.create({
      username,
      email,
      phone,
      password,
    });
    await AccountRole.create({
      role_id: "2",
      account_id: newUser?.id,
    });
    await AccountCountry.create({
      country_id: "1",
      account_id: newUser?.id,
    });

    const accessToken = generate.generateAccessToken({ user_id: newUser?.id });
    const refreshToken = generate.generateRefreshToken(
      { user_id: newUser?.id },
      "3h"
    );
    await Token.create({
      account_id: newUser.id,
      accessToken,

      type: "auth",
    });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    response.response(res, 200, "signup_success");
  } catch (error) {
    response.response(
      res,
      500,
      error?.errors.map((item) => {
        return { message: item?.message };
      })
    );
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  res.setHeader("Authorization", "");
  res.clearCookie("refreshToken");
  response.response(res, 200, "logout_success");
};

export { login, signup, logout };

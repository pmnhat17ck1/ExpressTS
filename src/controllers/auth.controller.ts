import { Request, Response } from "express";
import { Op } from "sequelize";
import { compareSync } from "bcrypt";

import db from "@/models";
import { isEmailOrPhone } from "@/utils/util";
import { generate } from "@/utils/index";
import { generateAccessToken } from "../utils/generate.util";

const { Account, AccountRole, AccountCountry, Token } = db;

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const input = { email: "", username: "", phone: "" };

  switch (isEmailOrPhone(email)) {
    case "phone":
      input["phone"] = email;
      break;
    case "email":
      input["email"] = email;
      break;
    default:
      input["username"] = email;
      break;
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
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (!compareSync(password, account.password)) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }
    const newAccessToken = generateAccessToken({
      account_id: account?.id,
    });
    const tokenAccount = await Token.findOne({
      where: {
        account_id: account.id,
      },
    });
    if (!tokenAccount.accessToken) {
      tokenAccount.update({
        accessToken: newAccessToken,
      });
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      res.status(200).json({ message: "Login success!" });
      return;
    }
    res.setHeader("Authorization", `Bearer ${tokenAccount.accessToken}`);
    res.status(200).json({ message: "Login success!" });
  } catch (error) {
    res.status(500).json();
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

    const accessToken = generate.generateAccessToken({ userId: newUser?.id });
    await Token.create({
      account_id: newUser.id,
      accessToken: accessToken,
      type: "auth",
    });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.status(200).json({ message: "Signup success!" });
  } catch (error) {
    res.status(500).json({ message: "Signup fail!" });
  }
};
// LOG OUT
// LOGOUT: async (req: any, res: any) => {
//   // Clear cookies when user logs out
//   // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//   const callback = async (): Promise<any> => {
//     res.clearCookie("refreshToken");
//     return { data: "Logged out successfully!", status: 200 };
//   };

//   return await response(res, callback);
// };
export { login, signup };

import { Request, Response } from "express";
import { Op } from "sequelize";

import { compareSync } from "bcrypt";
import db from "@/models";
import { isEmailOrPhone } from "@/utils/util";
import { generate } from "@/utils/index";
const { Account, AccountCountry, Token } = db;

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, token } = req.body;
  let username = "";
  let phone = "";
  let emailChecked = "";
  switch (isEmailOrPhone(email)) {
    case "phone":
      phone = email;
      return;
    case "email":
      emailChecked = email;
      return;
    default:
      username = email;
  }

  try {
    const user = await Account.findOne({
      where: {
        [Op.or]: [{ email: emailChecked }, { username: username }, { phone }],
      },
      include: [
        {
          model: Token,
          attributes: ["accessToken"],
        },
      ],
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
      nest: true,
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (!compareSync(password, user.password)) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }
    if (user?.accessToken) {
      res.status(200).json({ message: "Login success!" });
      return;
    }
    const accessToken = generate.generateAccessToken({ userId: user?.id });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json();
  }
};

const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, username, phone, password } = req.body ?? {};

  try {
    const foundUser = await Account.findOne({
      where: {
        [Op.or]: [{ email }, { username }, { phone }],
      },
    });
    if (!foundUser) {
      res.status(409).json({ message: "User already exist!" });
      return;
    }

    const newUser = await Account.create({
      username,
      email,
      phone,
      password,
    });

    await AccountCountry.create({
      country_id: 2,
      account_id: newUser?.id,
    });
    const accessToken = generate.generateAccessToken({ userId: newUser?.id });
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.json({ accessToken });
  } catch (error) {
    res.status(500).json();
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

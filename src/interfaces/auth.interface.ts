import { Request } from "express";
import { AccountI } from "@/interfaces/account.interface";

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: AccountI;
}

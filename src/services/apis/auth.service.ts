import { compareSync } from 'bcrypt';

import { CreateAccountDTO, LoginAccountDTO } from '@dtos/account.dto';
import { HttpException } from '@exceptions/HttpException';
import { AccountI } from '@interfaces/account.interface';
import { isEmpty } from '@utils/util';
import { jwt } from '@/utils/index';
import ServiceApis from './index.service';

class AuthService extends ServiceApis {
  public async signup(accountData: CreateAccountDTO): Promise<AccountI> {
    if (isEmpty(accountData)) throw new HttpException(400, 'userData is empty');
    const { findAccount } = await this.findAccount(accountData);
    if (findAccount) {
      await this.returnException(findAccount, 409, 'already exists');
    }
    const createAccountData: AccountI = await this.Account.create({
      ...accountData,
      is_active: false,
      role_id: 2,
      country_id: 1,
    });

    await this.Token.create({
      account_id: createAccountData.id,
      type: 'auth',
    });

    return { ...createAccountData };
  }

  public async login(accountData: LoginAccountDTO): Promise<{
    refreshToken: string;
    accessToken: string;
    findAccount: AccountI;
  }> {
    if (isEmpty(accountData))
      throw new HttpException(400, 'accountData is empty');
    const { findAccount } = await this.findAccount(accountData);
    if (!findAccount) {
      await this.returnException(findAccount, 409, 'was not found');
    }
    const isPasswordMatching: boolean = await compareSync(
      accountData.password,
      findAccount.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'Password not matching');
    let tokenAccess;
    const tokenAccount = await this.Token.findOne({
      where: {
        account_id: findAccount.id,
      },
    });
    tokenAccess = tokenAccount?.accessToken;
    const newAccessToken = jwt.generateAccessToken({
      account_id: findAccount?.id,
    });
    const newRefreshToken = jwt.generateRefreshToken({
      account_id: findAccount?.id,
    });
    if (!tokenAccess) {
      tokenAccount.update({
        accessToken: newAccessToken,
      });
      tokenAccess = newAccessToken;
    }
    const payload = jwt.verifyToken(tokenAccess);
    if (jwt.checkExpiredToken(payload.exp)) {
      tokenAccount.update({
        accessToken: newAccessToken,
      });
      tokenAccess = newAccessToken;
    }
    tokenAccount.save();
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      findAccount,
    };
  }

  public async logout(accountData: AccountI): Promise<AccountI> {
    if (isEmpty(accountData))
      throw new HttpException(400, 'accountData is empty');
    const { findAccount } = await this.findAccount(accountData);
    if (!findAccount) throw new HttpException(409, "Account doesn't exist");
    return findAccount;
  }
}

export default AuthService;

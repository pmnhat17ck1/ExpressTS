import { compareSync } from 'bcrypt';

import { CreateAccountDTO, LoginAccountDTO } from '@dtos/account.dto';
import { HttpException } from '@exceptions/HttpException';
import { AccountI } from '@interfaces/account.interface';
import { isEmpty } from '@utils/util';
import { jwt } from '@/utils/index';
import ServiceApis from './index.service';
import { randomCode, expiredTime } from '@/utils/common.util';
import { EmailService } from '@/services/systems';
class AuthService extends ServiceApis {
  public async signup(accountData: CreateAccountDTO): Promise<AccountI> {
    if (isEmpty(accountData)) throw new HttpException(400, 'userData is empty');
    const { findAccount } = await this.findAccount(accountData);
    if (findAccount) {
      throw new HttpException(409, 'Already exists');
    }
    const createAccountData: AccountI = await this.Account.create({
      ...accountData,
      is_active: false,
      role_id: 2,
      country_id: 1,
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
      throw new HttpException(404, 'Not found');
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

  public async forgotPassword(accountData: AccountI): Promise<void> {
    if (isEmpty(accountData))
      throw new HttpException(400, 'accountData is empty');
    const { findAccount } = await this.findAccount(accountData);
    if (!findAccount) throw new HttpException(404, "Account doesn't exist");
    const token = randomCode();
    const expires = expiredTime('5m');
    await this.ForgotPassword.create({
      email: accountData.email,
      token,
      expires,
      account_id: findAccount.id,
    });
    await EmailService.getInstance().sendEmail(
      accountData.email,
      'forgot password',
      `The code for forgot password: ${token}`
    );
  }

  public async resetPassword(accountData: {
    token: string;
    newPassword: string;
  }): Promise<void> {
    if (isEmpty(accountData))
      throw new HttpException(400, 'accountData is empty');
    const forgotPassword = await this.ForgotPassword.findOne({
      where: { token: accountData?.token },
    });
    if (!forgotPassword) {
      throw new HttpException(404, 'Invalid token');
    }
    if (new Date() > forgotPassword.expires) {
      await forgotPassword.destroy();
      throw new HttpException(404, 'Token has expired');
    }
    const { findAccount } = await this.findAccount(accountData);

    if (!findAccount) {
      await forgotPassword.destroy();
      throw new HttpException(404, 'Account not found');
    }
    await findAccount.update({ password: accountData?.newPassword });
    await forgotPassword.destroy();
  }
}

export default AuthService;

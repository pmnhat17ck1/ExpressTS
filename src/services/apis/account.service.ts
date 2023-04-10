import { CreateAccountDTO, UpdateAccountDTO } from '@dtos/account.dto';
import { HttpException } from '@exceptions/HttpException';
import { AccountI } from '@interfaces/account.interface';
import ServiceApis from './index.service';
class AccountService extends ServiceApis {
  public async getAccountById(account_id): Promise<any> {
    const account: AccountI = await this.Account.findByPk(account_id, {
      include: [
        {
          model: this.Country,
          as: 'country',
        },
        {
          model: this.Role,
          as: 'role',
        },
      ],

      attributes: {
        exclude: [
          'password',
          'countryId',
          'roleId',
          'CountryId',
          'RoleId',
          'createdAt',
          'updatedAt',
        ],
      },
    });
    if (!account) {
      throw new HttpException(404, 'Account not found');
    }
    return account;
  }

  public createAccount = async (
    accountData: CreateAccountDTO
  ): Promise<AccountI> => {
    const { findAccount } = await this.findAccount(accountData);
    if (findAccount) {
      throw new HttpException(409, 'Already exists');
    }
    const createAccountData: AccountI = await this.Account.create({
      ...accountData,
      is_active: true,
      role_id: 2,
      country_id: 1,
    });

    return { ...createAccountData };
  };

  public updateAccount = async (
    accountData: UpdateAccountDTO
  ): Promise<AccountI> => {
    const { email, username, phone, password, is_active, account_id } =
      accountData;
    const account: AccountI = await this.Account.update(
      {
        email,
        username,
        phone,
        password,
        is_active,
      },
      {
        where: {
          id: account_id,
        },
      }
    );
    if (!account) {
      throw new HttpException(404, 'Account not found');
    }
    return account;
  };

  public deleteAccount = async (account_id): Promise<void> => {
    const accountFound = await this.Account.findByPk(account_id);
    if (!accountFound) {
      throw new HttpException(404, 'Account not found');
    }
    await accountFound.destroy();
  };
}

export default AccountService;

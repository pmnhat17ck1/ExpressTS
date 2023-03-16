import { Op } from 'sequelize';

import { AccountI } from '@interfaces/account.interface';
import { CreateAccountDTO, LoginAccountDTO } from '@dtos/account.dto';
import { HttpException } from '@exceptions/HttpException';
import DB from '@models/index';

class ServiceApis {
  public Account = DB.Account;
  public Token = DB.Token;
  public Country = DB.Country;
  public Role = DB.Role;

  public async returnException(
    findAccount,
    status,
    stringError
  ): Promise<void> {
    const data = { type: '', name: '' };
    if (findAccount.email) {
      data['type'] = 'email';
      data['name'] = findAccount.email;
    }
    if (findAccount.username) {
      data['type'] = 'username';
      data['name'] = findAccount.username;
    }
    if (findAccount.phone) {
      data['type'] = 'phone';
      data['name'] = findAccount.phone;
    }
    throw new HttpException(
      status,
      `This ${data.type} ${data.name} ${stringError}`
    );
  }

  public async findAccount(accountData): Promise<{ findAccount: AccountI }> {
    const findAccount: AccountI = await this.Account.findOne({
      where: {
        [Op.or]: [
          { email: accountData.email },
          { username: accountData.username },
          { phone: accountData.phone },
        ],
      },
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
          'countryId',
          'roleId',
          'CountryId',
          'RoleId',
          'created_at',
          'updated_at',
          'createdAt',
          'updatedAt',
        ],
      },
    });
    return { findAccount };
  }
}

export default ServiceApis;

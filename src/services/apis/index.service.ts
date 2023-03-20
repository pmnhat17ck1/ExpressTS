import { Op } from 'sequelize';

import DB from '@models/index';

class ServiceApis {
  public Account = DB.Account;
  public Token = DB.Token;
  public Country = DB.Country;
  public Role = DB.Role;
  public ForgotPassword = DB.ForgotPassword;
  public async findAccount(accountData): Promise<{ findAccount }> {
    const findAccount = await this.Account.findOne({
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

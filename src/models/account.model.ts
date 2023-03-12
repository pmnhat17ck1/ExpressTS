import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';

import { AccountI } from '@/interfaces/account.interface';

export type AccountCreationAttributes = Optional<AccountI, 'id'>;

export class Account
  extends Model<AccountI, AccountCreationAttributes>
  implements Account
{
  public id!: string;
  public username!: string;
  public phone!: string;
  public email!: string;
  public is_active!: boolean;
  public password!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    Account.hasOne(models.Profile, {
      foreignKey: 'account_id',
    });
    Account.hasOne(models.Wallet, {
      foreignKey: 'account_id',
    });
    Account.hasOne(models.Token, {
      foreignKey: 'account_id',
    });

    Account.hasMany(models.Image, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Todo, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Notification, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Transaction, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Card, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Address, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Order, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Comment, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.Rate, {
      foreignKey: 'account_id',
    });
    Account.hasMany(models.PermissionRequest, {
      foreignKey: 'account_id',
    });
    Account.belongsTo(models.Country, {
      as: 'country',
      foreignKey: {
        allowNull: true,
      },
    });
    Account.belongsTo(models.Role, {
      as: 'role',
    });
    Account.belongsToMany(models.SocialApplication, {
      through: models.SocialAccount,
      foreignKey: 'account_id',
      onDelete: 'CASCADE',
    });
    Account.hasMany(models.AccountFunctionPermission, {
      foreignKey: 'account_id',
      onDelete: 'CASCADE',
    });
  };
  public static hook = (models: any): any => {
    Account.afterCreate((user) => {
      models.Wallet.create({
        account_id: user.id,
      });
      models.Profile.create({
        account_id: user.id,
      });
    });
  };
}

module.exports = function (sequelize: Sequelize): typeof Account {
  Account.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      phone: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(11),
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(45),
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
        set(value: string) {
          const salt = 10;
          this.setDataValue('password', hashSync(value, salt));
        },
      },
    },
    {
      modelName: 'Account',
      tableName: 'accounts',
      sequelize,
    }
  );

  return Account;
};

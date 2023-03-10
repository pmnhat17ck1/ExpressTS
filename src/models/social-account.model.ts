import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { SocialAccountI } from '@/interfaces/social-account.interface';

export type SocialAccountCreationAttributes = Optional<
  SocialAccountI,
  'id' | 'provider_account_id' | 'extraData'
>;

export class SocialAccount
  extends Model<SocialAccountI, SocialAccountCreationAttributes>
  implements SocialAccount
{
  public id!: string;
  public account_id!: number;
  public provider!: string;
  public provider_account_id!: string;
  public extraData!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associate = (models: any): any => {};
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof SocialAccount {
  SocialAccount.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      account_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      provider_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'SocialApplication',
          key: 'id',
        },
      },
      provider_account_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      extraData: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      modelName: 'SocialAccount',
      tableName: 'social_account',
      sequelize,
    }
  );

  return SocialAccount;
};

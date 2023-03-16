import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import { SocialAccountI } from '@/interfaces/social-account.interface';

export type SocialAccountCreationAttributes = Optional<
  SocialAccountI,
  'social_id' | 'extra_data'
>;

export class SocialAccount
  extends Model<SocialAccountI, SocialAccountCreationAttributes>
  implements SocialAccount
{
  public social_id!: string;
  public social_app_id!: string;
  public extra_data!: string;
  public account_id!: number;
  public client_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public static associate = (models) => {
    SocialAccount.belongsTo(models.SocialApplication,{
      foreignKey: 'client_id'
    });
  };
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof SocialAccount {
  SocialAccount.init(
    {
      social_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      social_app_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      extra_data: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      account_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Account',
          key: 'id',
        },
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

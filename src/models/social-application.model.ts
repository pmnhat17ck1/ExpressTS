import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import { SocialApplicationI } from '@/interfaces/social-application.interface';

export type SocialApplicationCreationAttributes = Optional<
  SocialApplicationI,
  'name' | 'client_id' | 'client_secret'
>;

export class SocialApplication
  extends Model<SocialApplicationI, SocialApplicationCreationAttributes>
  implements SocialApplication
{
  public name!: string;
  public client_id!: string;
  public client_secret!: string;
  public callback_url!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = () => {};
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof SocialApplication {
  SocialApplication.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      client_secret: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      callback_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: 'SocialApplication',
      tableName: 'social_application',
      sequelize,
    }
  );

  return SocialApplication;
};

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import { SocialApplicationI } from '@/interfaces/social-application.interface';

export type SocialApplicationCreationAttributes = Optional<
  SocialApplicationI,
  'id' | 'name' | 'clientId' | 'secretKey'
>;

export class SocialApplication
  extends Model<SocialApplicationI, SocialApplicationCreationAttributes>
  implements SocialApplication
{
  public id!: number;
  public name!: string;
  public clientId!: string;
  public secretKey!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    SocialApplication.belongsToMany(models.Account, {
      through: models.SocialAccount,
      foreignKey: 'provider_id',
    });
  };
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof SocialApplication {
  SocialApplication.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secretKey: {
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

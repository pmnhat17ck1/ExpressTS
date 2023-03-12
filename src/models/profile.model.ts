import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { ProfileI } from '@/interfaces/profile.interface';

export type ProfileCreationAttributes = Optional<
  ProfileI,
  'id' | 'fullName' | 'dateOfBirth' | 'avatar'
>;

export class Profile
  extends Model<ProfileI, ProfileCreationAttributes>
  implements Profile
{
  public id!: string;
  public fullName!: string;
  public dateOfBirth!: Date;
  public avatar!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    Profile.belongsTo(models.Account, {
      onDelete: 'CASCADE',
    });
    Profile.belongsTo(models.Address, {
      foreignKey: {
        allowNull: true,
      },
    });
    Profile.hasMany(models.Image);
  };
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof Profile {
  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      modelName: 'Profile',
      tableName: 'profiles',
      sequelize,
    }
  );

  return Profile;
};

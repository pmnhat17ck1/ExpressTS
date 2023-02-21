import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { UserDetailI } from '@/interfaces/user-detail.interface';

export type UserDetailCreationAttributes = Optional<UserDetailI, 'id'>;

export class UserDetail extends Model<UserDetailI, UserDetailCreationAttributes> implements UserDetail {
  public id!: string;
  public fullName!: string;
  public dateOfBirth!: Date;
  public address!: string;
  public avatarUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate = (models: any): any => {
    UserDetail.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
}

export default function (sequelize: Sequelize): typeof UserDetail {
  UserDetail.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'user_detail',
      modelName: 'UserDetail',
      sequelize,
    },
  );

  return UserDetail;
}

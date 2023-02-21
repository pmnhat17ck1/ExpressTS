import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { UserRoleI } from '@/interfaces/user-role.interface';

export type UserRoleCreationAttributes = Optional<UserRoleI, 'id'>;

export class UserRole extends Model<UserRoleI, UserRoleCreationAttributes> implements UserRole {
  public id!: string;
  public roleId!: number;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserRole {
  UserRole.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      roleId: {
        type: DataTypes.NUMBER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      tableName: 'user_role',
      modelName: 'UserRole',
      sequelize,
    },
  );

  return UserRole;
}

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import { RoleI } from '@/interfaces/role.interface';

export type RoleCreationAttributes = Optional<RoleI, 'id' | 'name'>;

export class Role extends Model<RoleI, RoleCreationAttributes> implements Role {
  public id: number;
  public name: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate = (models: any): any => {
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: 'roleId',
    });
  };
}

export default function (sequelize: Sequelize): typeof Role {
  Role.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.NUMBER.UNSIGNED,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      modelName: 'Role',
      tableName: 'roles',
      sequelize,
    },
  );

  return Role;
}

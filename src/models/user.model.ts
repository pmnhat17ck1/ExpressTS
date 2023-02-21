import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';

import { UserI } from '@/interfaces/user.interface';

export type UserCreationAttributes = Optional<UserI, 'id' | 'name' | 'email' | 'password'>;

export class User extends Model<UserI, UserCreationAttributes> implements User {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate = (models: any): any => {
    User.hasMany(models.SocialAccount, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.belongsToMany(models.UserRole, {
      through: models.UserRole,
      foreignKey: 'userId',
    });
    User.hasOne(models.UserDetail, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.belongsToMany(models.Country, {
      through: models.CountryUser,
      foreignKey: 'userId',
    });
    User.hasMany(models.Image, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
}

export default function (sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
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
      modelName: 'User',
      tableName: 'users',
      sequelize,
    },
  );

  return User;
}

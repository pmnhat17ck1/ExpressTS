import { Sequelize, DataTypes, Model } from 'sequelize';

export class Permission extends Model implements Permission {
  public id!: number;
  public name!: string;
  public static associate = (models: any): any => {
    Permission.belongsToMany(models.Account, {
      through: models.AccountFunctionPermission,
      onDelete: 'CASCADE',
    });
  };
  public static hook = () => {};
}
module.exports = function (sequelize: Sequelize): typeof Permission {
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      modelName: 'Permission',
      tableName: 'permissions',
      sequelize,
    }
  );
  return Permission;
};

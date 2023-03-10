import { Sequelize, DataTypes, Model } from "sequelize";

export class AccountFunctionPermission
  extends Model
  implements AccountFunctionPermission
{
  public id!: number;

  public static associate = (models: any): any => {
    AccountFunctionPermission.belongsTo(models.Account);
  };

  public static hook = (models: any): any => {};
}
module.exports = function (
  sequelize: Sequelize
): typeof AccountFunctionPermission {
  AccountFunctionPermission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      modelName: "AccountFunctionPermission",
      tableName: "account_function_permission",
      sequelize,
    }
  );
  return AccountFunctionPermission;
};

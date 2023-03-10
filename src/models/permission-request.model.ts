import { Sequelize, DataTypes, Model } from "sequelize";

export class PermissionRequest extends Model implements PermissionRequest {
  public id!: number;
  public name!: string;
  public static associate = (models: any): any => {
    PermissionRequest.belongsTo(models.Account);
    PermissionRequest.belongsTo(models.Function);
    PermissionRequest.belongsTo(models.Permission);
  };
}
module.exports = function (sequelize: Sequelize): typeof PermissionRequest {
  PermissionRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      message: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["accepted", "rejected", "pending"],
        defaultValue: "pending",
      },
    },
    {
      modelName: "PermissionRequest",
      tableName: "permission_request",
      sequelize,
    }
  );
  return PermissionRequest;
};

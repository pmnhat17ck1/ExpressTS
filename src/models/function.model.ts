import { Sequelize, DataTypes, Model } from "sequelize";

export class Function extends Model implements Function {
  public id!: number;
  public name!: string;
  public static associate = (models: any): any => {
    Function.belongsToMany(models.Account, {
      through: models.AccountFunctionPermission,
    });
  };
}
module.exports = function (sequelize: Sequelize): typeof Function {
  Function.init(
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
      modelName: "Function",
      tableName: "functions",
      sequelize,
    }
  );
  return Function;
};

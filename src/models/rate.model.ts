import { Sequelize, DataTypes, Model } from "sequelize";

export class Rate extends Model implements Rate {
  public id!: number;
  public value!: string;
  public comment!: number;
  public static associate = (models: any): any => {
    Rate.belongsTo(models.Product);
  };
  public static hook = (models: any): any => {};
}
module.exports = function (sequelize: Sequelize): typeof Rate {
  Rate.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      modelName: "Rate",
      tableName: "rates",
      sequelize,
    }
  );
  return Rate;
};

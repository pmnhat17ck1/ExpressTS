import { Sequelize, DataTypes, Model } from "sequelize";

export class Rate extends Model {
  public id!: number;
  public value!: string;
  public comment!: number;
}
export default function (sequelize: Sequelize) {
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
}

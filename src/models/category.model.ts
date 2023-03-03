import { Sequelize, DataTypes, Model } from "sequelize";

export class Category extends Model {
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}
export default function (sequelize: Sequelize) {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      modelName: "Category",
      tableName: "categories",
      sequelize,
    }
  );
  return Category;
}

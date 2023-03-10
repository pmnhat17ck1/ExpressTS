import { Sequelize, DataTypes, Model } from 'sequelize';

export class Category extends Model implements Category {
  public id!: number;
  public name!: string;
  public description!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    Category.belongsToMany(models.Product, {
      through: 'product_category',
      onDelete: 'CASCADE',
    });
  };
  public static hook = () => {};
}
module.exports = function (sequelize: Sequelize): typeof Category {
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
      modelName: 'Category',
      tableName: 'categories',
      sequelize,
    }
  );
  return Category;
};

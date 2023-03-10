import { Sequelize, DataTypes, Model } from "sequelize";

export class Product extends Model implements Product {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    Product.hasMany(models.Like, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
    Product.hasMany(models.Comment, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
    Product.hasMany(models.Rate, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });
    Product.belongsToMany(models.Order, {
      through: models.OrderDetail,
      foreignKey: "product_id",
    });
    Product.belongsToMany(models.Category, { through: "product_category" });
  };
}

module.exports = function (sequelize: Sequelize): typeof Product {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "Product",
      tableName: "products",
      sequelize,
    }
  );

  return Product;
};

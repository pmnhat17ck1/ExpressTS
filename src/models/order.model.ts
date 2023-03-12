import { Sequelize, DataTypes, Model } from 'sequelize';

export class Order extends Model implements Order {
  public id!: number;
  public totalPrice!: string;
  public description!: string;
  public status!: string;

  public created_at!: Date;
  public updated_at!: Date;
  public static associate = (models: any): any => {
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE',
    });
    Order.belongsToMany(models.Product, {
      through: models.OrderDetail,
      foreignKey: 'order_id',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.Account, {
      onDelete: 'CASCADE',
    });
  };
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof Order {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('paid', 'pending', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      modelName: 'Order',
      tableName: 'orders',
      sequelize,
    }
  );

  return Order;
};

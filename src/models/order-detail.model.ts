import { Sequelize, DataTypes, Model } from 'sequelize';

export class OrderDetail extends Model implements OrderDetail {
  public id!: number;
  public quantity!: string;
  public price!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    OrderDetail.belongsTo(models.Order, {
      onDelete: 'CASCADE',
    });
  };
  public static hook = () => {};
}
module.exports = function (sequelize: Sequelize): typeof OrderDetail {
  OrderDetail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      modelName: 'OrderDetail',
      tableName: 'order_detail',
      sequelize,
    }
  );
  return OrderDetail;
};

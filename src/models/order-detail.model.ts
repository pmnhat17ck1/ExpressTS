import { Sequelize, DataTypes, Model } from "sequelize";

export class OrderDetail extends Model {
  public id!: number;
  public quantity!: string;
  public price!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}
export default function (sequelize: Sequelize) {
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
      modelName: "OrderDetail",
      tableName: "order_detail",
      sequelize,
    }
  );
  return OrderDetail;
}

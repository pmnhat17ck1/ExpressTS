import { Sequelize, DataTypes, Model } from "sequelize";

export class PaymentMethod extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public icon!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize) {
  PaymentMethod.init(
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
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      modelName: "PaymentMethod",
      tableName: "payment_method",
      sequelize,
    }
  );

  return PaymentMethod;
}

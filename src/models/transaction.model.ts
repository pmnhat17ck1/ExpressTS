import { Sequelize, DataTypes, Model } from "sequelize";

export class Transaction extends Model {
  public id!: number;
  public amount!: string;
  public description!: string;
  public status!: string;

  public created_at!: Date;
  public updated_at!: Date;
}

export default function (sequelize: Sequelize) {
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("paid", "pending", "failed"),
        allowNull: false,
        defaultValue: "pending",
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
      modelName: "Transaction",
      tableName: "transactions",
      sequelize,
    }
  );

  return Transaction;
}

import { Sequelize, DataTypes, Model } from "sequelize";

export class Wallet extends Model {
  public id!: number;
  public balance!: string;

  public created_at!: Date;
  public updated_at!: Date;
}

export default function (sequelize: Sequelize) {
  Wallet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "Wallet",
      tableName: "wallets",
      sequelize,
    }
  );

  return Wallet;
}

import { Sequelize, DataTypes, Model } from "sequelize";

export class Card extends Model {
  public id!: number;
  public cardNumber!: string;
  public expirationDate!: Date;
  public cvv!: string;

  public created_at!: Date;
  public updated_at!: Date;
}
export default function (sequelize: Sequelize) {
  Card.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Card",
      tableName: "cards",
      sequelize,
    }
  );
  return Card;
}

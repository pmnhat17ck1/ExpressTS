import { Sequelize, DataTypes, Model } from "sequelize";

export class Notification extends Model {
  public id!: number;
  public content!: string;
  public isRead!: string;

  public created_at!: Date;
  public updated_at!: Date;
}

export default function (sequelize: Sequelize) {
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      modelName: "Notification",
      tableName: "notifications",
      sequelize,
    }
  );

  return Notification;
}

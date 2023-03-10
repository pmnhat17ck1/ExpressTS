import { Sequelize, DataTypes, Model } from "sequelize";

export class Notification extends Model implements Notification {
  public id!: number;
  public content!: string;
  public isRead!: string;

  public created_at!: Date;
  public updated_at!: Date;
  public static associate = (models: any): any => {
    Notification.belongsTo(models.Account);
  };
  public static hook = (models: any): any => {};
}

module.exports = function (sequelize: Sequelize): typeof Notification {
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
};

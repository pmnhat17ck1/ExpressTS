import { Sequelize, DataTypes, Model } from "sequelize";

export class Comment extends Model {
  public id!: number;
  public content!: string;

  public created_at!: Date;
  public updated_at!: Date;
}
export default function (sequelize: Sequelize) {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING(1000),
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
      modelName: "Comment",
      tableName: "comments",
      sequelize,
    }
  );
  return Comment;
}
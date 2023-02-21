import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export = (sequelize: Sequelize) => {
  class Image extends Model {
    public id!: string;

    public url!: string;

    public created_at!: Date;

    public updated_at!: Date;

    public static associate = (models: any): any => {
      Image.belongsTo(models.User, {
        foreignKey: "userDetailId",
      });
    };
  }
  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      url: {
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
      tableName: "images",
      modelName: "Image",
      sequelize,
    }
  );

  return Image;
};

import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { ImageI } from "@/interfaces/image.interface";

export type ImageCreationAttributes = Optional<
  ImageI,
  "id" | "url" | "created_at" | "updated_at"
>;

export class Image
  extends Model<ImageI, ImageCreationAttributes>
  implements Image
{
  public id!: string;
  public url!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Image {
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
      modelName: "Image",
      tableName: "images",
      sequelize,
    }
  );

  return Image;
}

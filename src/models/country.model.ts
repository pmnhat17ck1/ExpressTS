import { Sequelize, DataTypes, Model, Optional } from "sequelize";

import { CountryI } from "@/interfaces/country.interface";

export type CountryCreationAttributes = Optional<
  CountryI,
  "id" | "name" | "code"
>;

export class Country
  extends Model<CountryI, CountryCreationAttributes>
  implements Country
{
  public id!: number;
  public name!: string;
  public code!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Country {
  Country.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      modelName: "Country",
      tableName: "countries",
      sequelize,
    }
  );

  return Country;
}
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

import { AccountCountryI } from "@/interfaces/account-country.interface";

export type AccountCountryCreationAttributes = Optional<AccountCountryI, "id">;

export class AccountCountry
  extends Model<AccountCountryI, AccountCountryCreationAttributes>
  implements AccountCountry
{
  public id!: number;
  public country_id!: string;
  public account_id!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof AccountCountry {
  AccountCountry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      account_id: DataTypes.UUID,
      country_id: DataTypes.UUID,
    },
    {
      modelName: "AccountCountry",
      tableName: "account_country",
      sequelize,
    }
  );
  return AccountCountry;
}

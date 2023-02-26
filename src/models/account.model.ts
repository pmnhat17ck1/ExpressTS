import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { hashSync } from "bcrypt";

import { AccountI } from "@/interfaces/account.interface";

export type AccountCreationAttributes = Optional<AccountI, "id">;

export class Account
  extends Model<AccountI, AccountCreationAttributes>
  implements Account
{
  public id!: string;
  public username!: string;
  public phone!: string;
  public email!: string;
  public is_active!: boolean;
  public password!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Account {
  Account.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      phone: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(11),
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING(45),
      },
      is_active: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
        set(value: string) {
          const salt = 10;
          this.setDataValue("password", hashSync(value, salt));
        },
      },
    },
    {
      modelName: "Account",
      tableName: "accounts",
      sequelize,
    }
  );

  return Account;
}

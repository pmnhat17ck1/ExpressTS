import { Sequelize, DataTypes, Model, Optional } from "sequelize";

import { AccountRoleI } from "@/interfaces/account-role.interface";

export type AccountRoleCreationAttributes = Optional<AccountRoleI, "id">;

export class AccountRole
  extends Model<AccountRoleI, AccountRoleCreationAttributes>
  implements AccountRole
{
  public id!: number;
  public role_id!: string;
  public account_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof AccountRole {
  AccountRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_id: DataTypes.NUMBER,
      account_id: DataTypes.UUID,
    },
    {
      modelName: "AccountRole",
      tableName: "account_role",
      sequelize,
    }
  );

  return AccountRole;
}

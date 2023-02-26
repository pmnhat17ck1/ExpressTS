import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { AccountRoleI } from "@/interfaces/account-role.interface";

export type AccountRoleCreationAttributes = Optional<AccountRoleI, "id">;

export class AccountRole
  extends Model<AccountRoleI, AccountRoleCreationAttributes>
  implements AccountRole
{
  public id!: string;
  public role_id!: number;
  public account_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof AccountRole {
  AccountRole.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
      },
      role_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },
      account_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
      },
    },
    {
      modelName: "AccountRole",
      tableName: "account_role",
      sequelize,
    }
  );

  return AccountRole;
}

import { Sequelize, DataTypes, Model, Optional } from "sequelize";

import { RoleI } from "@/interfaces/role.interface";

export type RoleCreationAttributes = Optional<RoleI, "id" | "name">;

export class Role extends Model<RoleI, RoleCreationAttributes> implements Role {
  public id: number;
  public name: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Role {
  Role.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      modelName: "Role",
      tableName: "roles",
      sequelize,
    }
  );

  return Role;
}

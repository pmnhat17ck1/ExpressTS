import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { ProfileI } from "@/interfaces/profile.interface";

export type ProfileCreationAttributes = Optional<
  ProfileI,
  "id" | "fullName" | "dateOfBirth" | "address" | "avatarUrl"
>;

export class Profile
  extends Model<ProfileI, ProfileCreationAttributes>
  implements Profile
{
  public id!: string;
  public fullName!: string;
  public dateOfBirth!: Date;
  public address!: string;
  public avatarUrl!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Profile {
  Profile.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      avatarUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      modelName: "Profile",
      tableName: "profiles",
      sequelize,
    }
  );

  return Profile;
}

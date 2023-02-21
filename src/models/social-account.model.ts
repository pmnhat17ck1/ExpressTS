import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export = (sequelize: Sequelize) => {
  class SocialAccount extends Model {
    public id!: string;

    public userId!: number;

    public provider!: string;

    public providerUserId!: string;

  }
  SocialAccount.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerUserId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "social_account",
      modelName: "SocialAccount",
    }
  );

  return SocialAccount;
};

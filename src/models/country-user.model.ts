import { Sequelize, Model, DataTypes } from "sequelize";

export = (sequelize: Sequelize) => {
  class CountryUser extends Model {
    public id!: number;

    public country_id!: string;

    public user_id!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
  }
  CountryUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      country_id: DataTypes.INTEGER,
      user_id: DataTypes.UUID,
    },
    {
      tableName: "country_user",
      modelName: "CountryUser",
      sequelize,
    }
  );
  return CountryUser;
};

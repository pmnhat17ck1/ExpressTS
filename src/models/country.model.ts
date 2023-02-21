import { Sequelize, Model, DataTypes } from "sequelize";

export = (sequelize: Sequelize) => {
  class Country extends Model {
    public id!: number;

    public name!: string;

    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;

    public static associate = (models: any): any => {
      Country.belongsToMany(models.User, {
        through: models.CountryUser,
        foreignKey: "country_id",
      });
    };
  }
  Country.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: "countries",
      modelName: "Country",
      sequelize,
    }
  );
  return Country;
};

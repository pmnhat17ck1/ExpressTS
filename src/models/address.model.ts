import { Sequelize, DataTypes, Model } from "sequelize";

export class Address extends Model implements Address {
  public id!: number;
  public street!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public isDefault!: boolean;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    Address.belongsTo(models.Account);
    Address.hasOne(models.Profile);
  };
}
module.exports = function (sequelize: Sequelize): typeof Address {
  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      street: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      location: DataTypes.STRING,
      isDefault: DataTypes.BOOLEAN,
    },
    {
      modelName: "Address",
      tableName: "address",
      sequelize,
    }
  );
  return Address;
};

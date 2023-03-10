import { Sequelize, DataTypes, Model } from 'sequelize';

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
  };
  public static hook = (): any => {};
}
module.exports = function (sequelize: Sequelize): typeof Address {
  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      modelName: 'Address',
      tableName: 'address',
      sequelize,
    }
  );
  return Address;
};

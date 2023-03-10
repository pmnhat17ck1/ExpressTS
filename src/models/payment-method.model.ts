import { Sequelize, DataTypes, Model } from 'sequelize';

export class PaymentMethod extends Model implements PaymentMethod {
  public id!: number;
  public name!: string;
  public code!: string;
  public icon!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    PaymentMethod.hasMany(models.Transaction, {
      foreignKey: 'payment_method_id',
    });
    PaymentMethod.hasMany(models.Card, {
      foreignKey: 'payment_method_id',
    });
  };
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof PaymentMethod {
  PaymentMethod.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      modelName: 'PaymentMethod',
      tableName: 'payment_method',
      sequelize,
    }
  );

  return PaymentMethod;
};

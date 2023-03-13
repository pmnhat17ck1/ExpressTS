import { Sequelize, DataTypes, Model } from 'sequelize';

export class ForgotPassword extends Model implements ForgotPassword {
  public id!: number;
  public email!: string;
  public token!: string;
  public expires!: Date;

  public static associate = (models: any): any => {
    ForgotPassword.belongsTo(models.Account, {
      onDelete: 'CASCADE',
    });
  };
  public static hook = () => {};
}
module.exports = function (sequelize: Sequelize): typeof ForgotPassword {
  ForgotPassword.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      modelName: 'ForgotPassword',
      tableName: 'forgot_password',
      sequelize,
    }
  );
  return ForgotPassword;
};

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

import { TokenI } from '@/interfaces/token.interface';

export type TokenCreationAttributes = Optional<
  TokenI,
  'id' | 'account_id' | 'accessToken' | 'refreshToken' | 'type'
>;

export class Token
  extends Model<TokenI, TokenCreationAttributes>
  implements Token
{
  public id!: number;
  public account_id!: string;
  public accessToken!: string;
  public refreshToken!: string;
  public type!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public static associate = (models: any): any => {
    Token.belongsTo(models.Account);
  };
  public static hook = () => {};
}

module.exports = function (sequelize: Sequelize): typeof Token {
  Token.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      account_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id',
        },
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: DataTypes.STRING,
    },
    {
      timestamps: false,
      modelName: 'Token',
      tableName: 'tokens',
      sequelize,
    }
  );

  return Token;
};

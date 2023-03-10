import { Sequelize, DataTypes, Model } from 'sequelize';

export class Like extends Model implements Like {
  public id!: number;
  public type!: string;

  public created_at!: Date;
  public updated_at!: Date;
  public static associate = (models: any): any => {
    Like.belongsTo(models.Product);
    Like.belongsTo(models.Account);
  };
  public static hook = () => {};
}
module.exports = function (sequelize: Sequelize): typeof Like {
  Like.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['like', 'dislike'],
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      modelName: 'Like',
      tableName: 'likes',
      sequelize,
    }
  );
  return Like;
};

import { Sequelize, Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export = (sequelize: Sequelize) => {
  class Todo extends Model {
    public id!: string;

    public title!: string;

    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;

    public readonly updatedAt!: Date;
  }
  Todo.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "todos",
      modelName: "Todo",
    }
  );

  return Todo;
};

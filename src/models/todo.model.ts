import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { TodoI } from "@/interfaces/todo.interface";

export type TodoCreationAttributes = Optional<
  TodoI,
  "id" | "title" | "pin" | "description" | "dueDate"
>;

export class Todo extends Model<TodoI, TodoCreationAttributes> implements Todo {
  public id!: string;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public pin!: boolean;

  public created_at!: Date;
  public updated_at!: Date;
  public static associate = (models: any): any => {
    Todo.belongsTo(models.Account);
  };
}

module.exports = function (sequelize: Sequelize): typeof Todo {
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      pin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
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
      modelName: "Todo",
      tableName: "todos",
      sequelize,
    }
  );

  return Todo;
};

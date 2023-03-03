import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { TaskI } from "@/interfaces/task.interface";

export type TaskreationAttributes = Optional<
  TaskI,
  "id" | "title" | "pin" | "description" | "dueDate"
>;

export class Task extends Model<TaskI, TaskreationAttributes> implements Task {
  public id!: string;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public pin!: boolean;

  public created_at!: Date;
  public updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Task {
  Task.init(
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
      modelName: "Task",
      tableName: "tasks",
      sequelize,
    }
  );

  return Task;
}

import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { TaskI } from "@/interfaces/task.interface";

export type TaskreationAttributes = Optional<
  TaskI,
  | "id"
  | "title"
  | "summary"
  | "description"
  | "reporter"
  | "assignee"
  | "linkIssue"
  | "dueDate"
>;

export class Task extends Model<TaskI, TaskreationAttributes> implements Task {
  public id!: string;
  public title!: string;
  public summary!: string;
  public description!: string;
  public reporter!: string;
  public assignee!: string;
  public linkIssue!: string;
  public dueDate!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function (sequelize: Sequelize): typeof Task {
  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reporter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assignee: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkIssue: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
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

import { Request, Response } from "express";
import db from "@/models";

const { Todo } = db;

export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json();
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description } = req.body;

  try {
    const todos = await Todo.create({ title, description });
    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json();
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json();
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    await todo.destroy();

    res.status(204).json();
  } catch (error) {
    res.status(500).json();
  }
};

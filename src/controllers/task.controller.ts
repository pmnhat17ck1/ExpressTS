import { Request, Response } from "express";
import db from "@/models";

const { Task } = db;

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json();
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json();
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  const { title, description } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      res.status(404).json({ message: "task not found" });
      return;
    }

    task.title = title || task.title;
    task.description = description || task.description;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json();
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id, 10);

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      res.status(404).json({ message: "task not found" });
      return;
    }

    await task.destroy();

    res.status(204).json();
  } catch (error) {
    res.status(500).json();
  }
};

import { Request, Response } from 'express';
import db from '@/models';
import { response } from '@/utils/response.util';

const { Todo } = db;
class TodoController {
  public getAllTodos = async (req: any, res: Response): Promise<void> => {
    try {
      const todos = await Todo.findAll();
      response(res, 200, todos);
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteAllTodoByAccountId = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      await Todo.destroy({ where: { account_id: req.account.id } });
      response(res, 200);
    } catch (error) {
      response(res, 500);
    }
  };
  public getAllTodoByAccountId = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const todos = await Todo.findAll({
        where: { account_id: req.account.id },
      });
      response(res, 200, todos);
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteByIds = async (req: Request, res: Response): Promise<void> => {
    try {
      await Todo.destroy({ where: {} });
      response(res, 200);
    } catch (error) {
      response(res, 500);
    }
  };
  public createTodo = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;

    try {
      const todos = await Todo.create({ title, description });
      res.status(201).json(todos);
    } catch (error) {
      res.status(500).json();
    }
  };
  public updateTodo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { title, description } = req.body;

    try {
      const todo = await Todo.findByPk(id);

      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
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
  public deleteTodo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);

    try {
      const todo = await Todo.findByPk(id);

      if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
      }

      await todo.destroy();

      res.status(204).json();
    } catch (error) {
      res.status(500).json();
    }
  };
}
export { TodoController };

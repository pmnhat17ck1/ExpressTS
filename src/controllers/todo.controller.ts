import { Request, Response } from 'express';
import db from '@/models';
import { response } from '@/utils/response.util';
import { TodoI } from '@/interfaces/todo.interface';
import { CreateTodoDTO, DeleteTodoDTO, UpdateTodoDTO } from '@/dtos/todo.dto';
const { Todo } = db;
class TodoController {
  public getAllTodos = async (req: any, res: Response): Promise<void> => {
    try {
      const todos: TodoI = await Todo.findAll();
      response(res, 200, todos);
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteAllTodoByAccount = async (
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
  public getAllTodoByAccount = async (
    req: any,
    res: Response
  ): Promise<void> => {
    try {
      const todos: TodoI = await Todo.findAll({
        where: { account_id: req.account.id },
      });
      response(res, 200, todos);
    } catch (error) {
      response(res, 500);
    }
  };
  public deleteTodoByIds = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { listTodoIds }: DeleteTodoDTO = req.body;

      await Todo.destroy({
        where: {
          id: listTodoIds,
        },
      });
      response(res, 200);
    } catch (error) {
      response(res, 500);
    }
  };
  public createTodo = async (req: Request, res: Response): Promise<void> => {
    const { title, description }: CreateTodoDTO = req.body;

    try {
      const todos: TodoI = await Todo.create({ title, description });
      response(res, 201, todos);
    } catch (error) {
      response(res, 500);
    }
  };
  public updateTodo = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    const { title, description }: UpdateTodoDTO = req.body;

    try {
      const todo = await Todo.findByPk(id);

      if (!todo) {
        return response(res, 404);
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
        return response(res, 404);
      }

      await todo.destroy();
      response(res, 204);
    } catch (error) {
      response(res, 500);
    }
  };
}
export { TodoController };

import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';
import { Routes } from '@interfaces/routes.interface';
import { authenticate } from '../middlewares/auth.middleware';

class TodoRoute implements Routes {
  public path = '/';
  public router = Router();
  public todoController = new TodoController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authenticate);
    this.router.get(`${this.path}todos`, this.todoController.getAllTodos);
    this.router.post(`${this.path}todos`, this.todoController.createTodo);
    this.router.put(`${this.path}todos/:id`, this.todoController.updateTodo);
    this.router.delete(`${this.path}todos/:id`, this.todoController.deleteTodo);
  }
}
export { TodoRoute };

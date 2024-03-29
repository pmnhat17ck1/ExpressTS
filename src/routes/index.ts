import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';

import { TodoRoute } from './todo.route';
import { AuthRoute } from './auth.route';
import { AccountRoute } from './account.route';

class GetRoutes implements Routes {
  public path = '/';
  public router = Router();
  public todoRoute = new TodoRoute();
  public authRoute = new AuthRoute();
  public accountRoute = new AccountRoute();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.use('/todos', this.todoRoute.router);
    this.router.use('/auth', this.authRoute.router);
    this.router.use('/account', this.accountRoute.router);
  }
}

export { GetRoutes };

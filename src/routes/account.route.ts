import { Router } from 'express';
// import validationMiddleware from '@middlewares/validation.middleware';
import { authenticate } from '@middlewares/auth.middleware';
// import { CreateAccountDTO, LoginAccountDTO } from '@dtos/account.dto';
import { Routes } from '@interfaces/routes.interface';
import { AccountController } from '@controllers/account.controller';
class AccountRoute implements Routes {
  public path = '/';
  public router = Router();
  public accountController = new AccountController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}:account_id`,
      authenticate,
      this.accountController.getAccountById
    );
    this.router.put(
      `${this.path}:account_id`,
      authenticate,
      this.accountController.updateAccount
    );
    this.router.delete(
      `${this.path}:account_id`,
      authenticate,
      this.accountController.deleteAccount
    );
  }
}

export { AccountRoute };

import { Router } from 'express';
// import validationMiddleware from '@middlewares/validation.middleware';
import { authenticateAdmin } from '@middlewares/auth.middleware';
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
      `${this.path}`,
      authenticateAdmin,
      this.accountController.getAllAccount
    );
    this.router.get(
      `${this.path}:account_id`,
      authenticateAdmin,
      this.accountController.getAccountById
    );
    this.router.put(
      `${this.path}:account_id`,
      authenticateAdmin,
      this.accountController.updateAccount
    );
    this.router.delete(
      `${this.path}:account_id`,
      authenticateAdmin,
      this.accountController.deleteAccount
    );
  }
}

export { AccountRoute };

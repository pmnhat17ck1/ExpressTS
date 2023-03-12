import { Router } from 'express';
import validationMiddleware from '@middlewares/validation.middleware';
import { authenticate } from '@middlewares/auth.middleware';
import { CreateAccountDTO, LoginAccountDTO } from '@dtos/account.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthController } from '@controllers/auth.controller';
class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}login`,
      validationMiddleware(LoginAccountDTO, 'body'),
      this.authController.logIn
    );
    this.router.post(
      `${this.path}signup`,
      validationMiddleware(CreateAccountDTO, 'body'),
      this.authController.signUp
    );
    this.router.post(
      `${this.path}logout`,
      authenticate,
      this.authController.logOut
    );
  }
}

export { AuthRoute };

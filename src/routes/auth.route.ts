import { Router } from 'express';
import { login, signup } from '@/controllers/auth.controller';
import validation from '@middlewares/validation.middleware';
import { authenticate } from '@middlewares/auth.middleware';
import { CreateAccountDTO, LoginAccountDTO } from '@dtos/account.dto';
import { logout } from '@controllers/auth.controller';

const router = Router();

router.post('/login', validation(LoginAccountDTO, 'body'), login);
router.post('/signup', validation(CreateAccountDTO, 'body'), signup);
router.post('/logout', authenticate, logout);

export default router;

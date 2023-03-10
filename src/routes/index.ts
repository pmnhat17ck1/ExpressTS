import { Router } from 'express';
import todoRouter from './todo.route';
import authRouter from './auth.route';

const getRoutes = () => {
  const router = Router();
  router.use('/todos', todoRouter);
  router.use('/auth', authRouter);
  return router;
};
export { getRoutes, authRouter, todoRouter };

import { Router } from "express";
import taskRouter from "./task.route";
import authRouter from "./auth.route";

const getRoutes = () => {
  const router = Router();
  router.use("/tasks", taskRouter);
  router.use("/auth", authRouter);
  return router;
};
export { getRoutes, authRouter, taskRouter };

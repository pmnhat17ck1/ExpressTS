import { Router } from "express";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);
router.get("/todos", getAllTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;

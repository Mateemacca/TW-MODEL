import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
const tasksRoutes = Router();

tasksRoutes.get("/tasks", authRequired, getTasks);
tasksRoutes.get("/tasks/:id", authRequired, getTask);
tasksRoutes.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);
tasksRoutes.delete("/tasks/:id", authRequired, deleteTask);
tasksRoutes.put("/tasks/:id", authRequired, updateTask);

export default tasksRoutes;

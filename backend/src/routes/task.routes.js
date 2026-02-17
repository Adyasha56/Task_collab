import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getTasksByBoard,
  moveTask,
} from "../controllers/task.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.patch("/move/:taskId", protect, moveTask);
router.get("/board/:boardId", protect, getTasksByBoard);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
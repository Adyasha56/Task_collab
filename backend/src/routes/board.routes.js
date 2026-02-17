import express from "express";
import { createBoard, getBoards,getBoardDetails } from "../controllers/board.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:boardId", protect, getBoardDetails);

export default router;
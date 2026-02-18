import express from "express";
import { createBoard, getBoards, getBoardDetails, joinBoard } from "../controllers/board.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createBoard);
router.get("/", protect, getBoards);
router.get("/:boardId", protect, getBoardDetails);
router.post("/:boardId/join", protect, joinBoard);

export default router;
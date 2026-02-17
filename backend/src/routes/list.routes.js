import express from "express";
import { createList } from "../controllers/list.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createList);

export default router;
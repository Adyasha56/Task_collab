import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";
import listRoutes from "./routes/list.routes.js";
import taskRoutes from "./routes/task.routes.js";
import activityRoutes from "./routes/activity.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activities", activityRoutes);

app.use(errorHandler);

/* SOCKET LOGIC */
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`Joined board ${boardId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { io };

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
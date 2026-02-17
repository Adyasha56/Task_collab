import Task from "../models/Task.js";
import { logActivity } from "../utils/activityLogger.js";
import { io } from "../server.js";

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    if (task.boardId) {
      io.to(task.boardId.toString()).emit("taskCreated", task);
    }
    await logActivity({
      user: req.user.id,
      action: "created task",
      taskId: task._id,
      boardId: task.boardId,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.boardId) {
      io.to(task.boardId.toString()).emit("taskUpdated", task);
    }
    await logActivity({
      user: req.user.id,
      action: "updated task",
      taskId: task._id,
      boardId: task.boardId,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    await Task.findByIdAndDelete(req.params.id);
    if (task.boardId) {
      io.to(task.boardId.toString()).emit("taskDeleted", req.params.id);
    }
    await logActivity({
      user: req.user.id,
      action: "deleted task",
      taskId: req.params.id,
      boardId: task.boardId,
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasksByBoard = async (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;

  const query = {
    boardId: req.params.boardId,
    title: { $regex: search, $options: "i" },
  };

  const tasks = await Task.find(query)
    .limit(Number(limit))
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  res.json(tasks);
};

export const moveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { sourceListId, destinationListId, newPosition } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // shift tasks in destination list
    await Task.updateMany(
      {
        listId: destinationListId,
        position: { $gte: newPosition },
      },
      { $inc: { position: 1 } }
    );

    // update moved task
    task.listId = destinationListId;
    task.position = newPosition;

    await task.save();

    // realtime emit
    if (task.boardId) {
      io.to(task.boardId.toString())
        .emit("taskMoved", task);
    }

    // activity log
    await logActivity({
      user: req.user.id,
      action: "moved task",
      taskId: task._id,
      boardId: task.boardId,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
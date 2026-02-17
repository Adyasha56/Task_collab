import Board from "../models/Board.js";
import List from "../models/List.js";
import Task from "../models/Task.js";

export const createBoard = async (req, res) => {
  const board = await Board.create({
    title: req.body.title,
    owner: req.user.id,
    members: [req.user.id],
  });

  res.json(board);
};

export const getBoards = async (req, res) => {
  const boards = await Board.find({
    members: req.user.id,
  });

  res.json(boards);
};



export const getBoardDetails = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findById(boardId)
    .populate("members", "name email");

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  const lists = await List.find({ boardId })
    .sort({ position: 1 });

  const tasks = await Task.find({ boardId })
    .sort({ position: 1 });

  // attach tasks to lists
  const listsWithTasks = lists.map((list) => ({
    ...list.toObject(),
    tasks: tasks.filter(
      (task) =>
        task.listId.toString() === list._id.toString()
    ),
  }));

  res.json({
    board,
    lists: listsWithTasks,
  });
};
import Board from "../models/Board.js";
import List from "../models/List.js";
import Task from "../models/Task.js";

export const createBoard = async (req, res) => {
  const board = await Board.create({
    title: req.body.title,
    owner: req.user.id,
    members: [req.user.id],
  });

  await board.populate("members", "name email _id");
  res.json(board);
};

export const getBoards = async (req, res) => {
  const boards = await Board.find({
    members: req.user.id,
  }).populate("members", "name email _id");

  res.json(boards);
};



export const getBoardDetails = async (req, res) => {
  const { boardId } = req.params;

  const board = await Board.findById(boardId)
    .populate("members", "name email _id");

  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  const lists = await List.find({ boardId })
    .sort({ position: 1 });

  const tasks = await Task.find({ boardId })
    .populate("assignedTo", "name email _id")
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

export const joinBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const userId = req.user.id;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Check if user is already a member
    if (board.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member of this board" });
    }

    // Add user to members
    board.members.push(userId);
    await board.save();

    // Populate members for response
    await board.populate("members", "name email _id");

    // Get lists and tasks for the board
    const lists = await List.find({ boardId })
      .sort({ position: 1 });

    const tasks = await Task.find({ boardId })
      .sort({ position: 1 });

    // Attach tasks to lists
    const listsWithTasks = lists.map((list) => ({
      ...list.toObject(),
      tasks: tasks.filter(
        (task) =>
          task.listId.toString() === list._id.toString()
      ),
    }));

    res.json({ message: "Joined board successfully", board, lists: listsWithTasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
import Activity from "../models/Activity.js";

export const getBoardActivities = async (req, res) => {
  const activities = await Activity.find({
    boardId: req.params.boardId,
  })
    .populate("user", "name email")
    .populate("assignedToUser", "name email")
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(activities);
};
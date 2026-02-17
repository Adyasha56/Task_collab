export const getBoardActivities = async (req, res) => {
  const activities = await Activity.find({
    boardId: req.params.boardId,
  })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  res.json(activities);
};
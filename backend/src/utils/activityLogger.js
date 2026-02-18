import Activity from "../models/Activity.js";

export const logActivity = async ({
  user,
  action,
  details = "",
  taskId,
  boardId,
  assignedToUser = null,
  changes = null,
}) => {
  await Activity.create({
    user,
    action,
    details,
    taskId,
    boardId,
    assignedToUser,
    changes,
  });
};
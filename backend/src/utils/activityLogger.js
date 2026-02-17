import Activity from "../models/Activity.js";

export const logActivity = async ({
  user,
  action,
  taskId,
  boardId,
}) => {
  await Activity.create({
    user,
    action,
    taskId,
    boardId,
  });
};
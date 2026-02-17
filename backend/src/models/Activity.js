import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
  },
  { timestamps: true }
);
activitySchema.index({ boardId: 1 });
export default mongoose.model("Activity", activitySchema);
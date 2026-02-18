import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    details: String, // More detailed description of the action
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    assignedToUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If assigned to someone
    changes: mongoose.Schema.Types.Mixed, // Store what changed (for updates)
  },
  { timestamps: true }
);
activitySchema.index({ boardId: 1 });
activitySchema.index({ createdAt: -1 });
export default mongoose.model("Activity", activitySchema);
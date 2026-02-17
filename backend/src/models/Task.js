import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    boardId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Board",
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    position: Number,
    dueDate: Date,
  },
  
  { timestamps: true }
);

taskSchema.index({ boardId: 1 });
taskSchema.index({ listId: 1 });
taskSchema.index({ title: "text" });

export default mongoose.model("Task", taskSchema);
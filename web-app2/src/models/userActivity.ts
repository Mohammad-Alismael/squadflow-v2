import mongoose, { Schema, models } from "mongoose";

const userActivitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    taskId: { type: Schema.Types.ObjectId, ref: "task" },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", userActivitySchema);
export default Task;

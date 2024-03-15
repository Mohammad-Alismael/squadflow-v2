import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    columnId: {
      type: String,
      required: true,
    },
    labels: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", userSchema);
export default Task;

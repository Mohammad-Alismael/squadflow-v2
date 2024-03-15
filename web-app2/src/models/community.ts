import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
    participants: [
      {
        user_id: String,
      },
    ],
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", userSchema);
export default Task;

import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    workspace: { type: Schema.Types.ObjectId, ref: "Workspace" },
    title: {
      type: String,
      required: true,
    },
    columnId: {
      type: String,
      required: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        created_at: { type: Date, default: Date.now() },
      },
    ],
    dueDate: String,
    dueTime: String,
    priority: String,
    description: String,
    attachments: [String],
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", taskSchema);
export default Task;

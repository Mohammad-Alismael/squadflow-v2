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
    labels: [{ color: String, title: String }],
    comments: [
      {
        created_by: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        created_at: { type: Date, default: Date.now() },
      },
    ],
    dueDate: {
      type: String,
      required: false,
    },
    dueTime: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
    description: {
      type: String,
    },
    attachments: [String],
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", taskSchema);
export default Task;

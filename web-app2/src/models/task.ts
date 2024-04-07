import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace" },
    title: {
      type: String,
      required: true,
    },
    columnId: {
      type: String,
      required: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    labels: [
      {
        type: String,
        required: true,
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

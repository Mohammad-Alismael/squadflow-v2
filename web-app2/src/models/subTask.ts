import mongoose, { models, Schema } from "mongoose";

const subTaskSchema = new Schema(
  {
    task: { type: Schema.Types.ObjectId, ref: "task" },
    title: {
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

const SubTask = models.SubTask || mongoose.model("Task", subTaskSchema);
export default SubTask;

import mongoose, { models, Schema } from "mongoose";

const subTaskSchema = new Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "task" },
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
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const SubTask = models.SubTask || mongoose.model("Task", subTaskSchema);
export default SubTask;

import mongoose, { Schema, models } from "mongoose";
import "./workspace";
import "./user";
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
    commentsCount: { type: Number, default: 0 },
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
  {
    timestamps: true,
    // toObject: { virtuals: true },
    // toJSON: { virtuals: true },
  }
);
taskSchema.pre("save", function (next) {
  if (this.isModified("comments")) {
    this.commentsCount = this.comments.length;
  }
  next();
});

taskSchema.post("insertMany", async function (docs) {
  for (const doc of docs) {
    // Ensure commentsCount is set correctly for each document
    doc.commentsCount = doc.comments.length || 0;
    await doc.save();
  }
});

// taskSchema.virtual("commentsCount").get(function () {
//   return this.comments.length;
// });

const Task = models.Task || mongoose.model("Task", taskSchema);
export default Task;

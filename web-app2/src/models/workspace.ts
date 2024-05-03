import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    community: { type: Schema.Types.ObjectId, ref: "Community" },
    title: {
      type: String,
      required: true,
    },
    participants: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String },
      },
    ],
    columns: {
      type: [{ order: Number, title: String, color: String }],
      default: [
        { order: 1, title: "ongoing", color: "red" },
        { order: 2, title: "urgent", color: "red" },
        { order: 3, title: "completed", color: "red" },
      ],
    },
    labels: [{ color: String, title: String }],
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Workspace = models.Workspace || mongoose.model("Workspace", userSchema);
export default Workspace;

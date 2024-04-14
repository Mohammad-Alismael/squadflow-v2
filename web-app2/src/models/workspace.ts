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
        role: String, // Role of the participant
      },
    ],
    columns: [{ columnId: String, title: String, color: String }],
    progress: Number,
  },
  { timestamps: true }
);

const Workspace = models.Workspace || mongoose.model("Workspace", userSchema);
export default Workspace;

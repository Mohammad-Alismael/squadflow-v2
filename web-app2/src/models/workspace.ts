import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "user" },
    communityId: String,
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
    labels: [
      {
        name: String,
        color: String,
      },
    ],
    columns: [{ columnId: String, title: String, color: String }],
  },
  { timestamps: true }
);

const Workspace = models.Workspace || mongoose.model("Workspace", userSchema);
export default Workspace;

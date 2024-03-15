import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    labels: [
      {
        name: String,
        color: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Workspace = models.Workspace || mongoose.model("Workspace", userSchema);
export default Workspace;

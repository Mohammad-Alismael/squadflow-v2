import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: String,
    community: { type: Schema.Types.ObjectId, ref: "Community" },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;

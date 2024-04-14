import mongoose, { Schema, models } from "mongoose";
import { generateRandomId } from "@/lib/community";

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        joined_at: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Community =
  models.Community || mongoose.model("Community", CommunitySchema);
export default Community;

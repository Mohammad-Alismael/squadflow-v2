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
      default: generateRandomId(10),
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Community =
  models.Community || mongoose.model("Community", CommunitySchema);
export default Community;

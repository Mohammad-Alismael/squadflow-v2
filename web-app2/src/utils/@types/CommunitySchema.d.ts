import mongoose, { Document, Schema } from "mongoose";
import { User } from "@/utils/@types/user";

export interface CommunitySchema extends Document {
  name: string;
  code: string;
  admin: Schema.Types.ObjectId | User; // Reference to User schema or ObjectId
  participants: Array<Schema.Types.ObjectId | User>; // Array of references to User schema or ObjectId
}

import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "@/utils/@types/user";

export interface ICommunity extends Document {
  name: string;
  code: string;
  admin: Schema.Types.ObjectId | IUser; // Reference to User schema or ObjectId
  participants: Array<{ user: Schema.Types.ObjectId | IUser; joined_at: Date }>; // Array of references to User schema or ObjectId
}

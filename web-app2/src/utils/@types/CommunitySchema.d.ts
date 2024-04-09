import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "@/utils/@types/user";

export interface CommunitySchema extends Document {
  name: string;
  code: string;
  admin: Schema.Types.ObjectId | IUser; // Reference to User schema or ObjectId
  participants: Array<Schema.Types.ObjectId | IUser>; // Array of references to User schema or ObjectId
}

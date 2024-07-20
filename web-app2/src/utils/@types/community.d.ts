import mongoose, { Document, Schema } from "mongoose";
import { IUser, PopulatedUser } from "@/utils/@types/user";

export interface ICommunity extends Document {
  name: string;
  code: string;
  admin: Schema.Types.ObjectId | IUser; // Reference to User schema or ObjectId
  participants: Array<{
    user: Schema.Types.ObjectId | IUser | string;
    joined_at: Date;
  }>; // Array of references to User schema or ObjectId
}

export interface Participant {
  _id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  joined_at: Date;
}

export type CommunityResponse = {
  _id: string;
  name: string;
  code: string;
  admin: PopulatedUser;
  participants: Array<{
    user: PopulatedUser;
    joined_at: string;
    _id: string;
  }>;
  isAdmin: boolean;
};

import { Schema } from "mongoose";
import { IUser, PopulatedUser } from "@/utils/@types/user";

export interface ITask {
  _id?: string;
  workspace: Schema.Types.ObjectId | IWorkspace;
  title: string;
  columnId: string;
  participants: Schema.Types.ObjectId[] | IUser[];
  labels: string[];
  comments: {
    user: Schema.Types.ObjectId | IUser | string;
    text: string;
    created_at: Date;
  }[];
  dueDate: string;
  dueTime: string;
  priority: string;
  description: string;
  attachments: string[];
  created_by: Schema.Types.ObjectId | IUser;
  updated_by: Schema.Types.ObjectId | IUser;
}

export interface Comment {
  _id?: string;
  user: PopulatedUser;
  text: string;
  created_at: Date;
}
export interface ICommentCreate {
  _id?: string;
  created_by: string;
  text: string;
  created_at: Date;
}

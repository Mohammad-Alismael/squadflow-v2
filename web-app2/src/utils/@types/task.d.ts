import { Schema } from "mongoose";
import { IUser } from "@/utils/@types/user";

export interface ITask {
  _id?: string;
  workspace: Schema.Types.ObjectId | IWorkspace;
  title: string;
  columnId: string;
  participants: Schema.Types.ObjectId[] | IUser[];
  tags: string[];
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

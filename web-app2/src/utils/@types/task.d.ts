import { Schema } from "mongoose";
import { IUser, PopulatedUser } from "@/utils/@types/user";
import {
  IWorkspace,
  WorkspaceLabel,
  WorkspaceParticipants,
} from "@/utils/@types/workspace";
import { ObjectId } from "mongodb";

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
  created_by: ObjectId;
  updated_by: ObjectId;
}
export interface ITaskAction {
  _id?: string;
  workspace: Schema.Types.ObjectId | IWorkspace;
  title: string;
  columnId: string;
  participants: Schema.Types.ObjectId[] | IUser[];
  labels: string[];
  comments: {
    created_by: string;
    text: string;
  }[];
  dueDate: string;
  dueTime: string;
  priority: string;
  description: string;
  attachments: string[];
  created_by: ObjectId;
  updated_by: ObjectId;
}

export interface TaskResponse {
  _id: string;
  workspace: Schema.Types.ObjectId;
  title: string;
  columnId: string;
  participants: PopulatedUser[];
  labels: WorkspaceLabel[];
  comments: Comment[];
  dueDate: string;
  dueTime: string;
  priority: string;
  description: string;
  attachments: string[];
  created_by: Schema.Types.ObjectId;
  updated_by: Schema.Types.ObjectId;
}

export interface MetaTaskResponse {
  _id: string;
  workspace: string;
  title: string;
  columnId: string;
  participants: { _id: string; username: string; photoURL: string }[];
  labels: { _id: string; color: string }[];
  commentsCount: number;
  dueDate: string;
}

export interface Comment {
  _id?: string;
  created_by: PopulatedUser;
  text: string;
  created_at: string;
}
export interface ICommentCreate {
  _id?: string;
  created_by: string;
  text: string;
  created_at?: string;
}

export interface IDashboardTask {
  _id?: string;
  workspace: { _id: Schema.Types.ObjectId; title: string };
  title: string;
  columnId: string;
  participants: PopulatedUser[];
  labels: { color: string; title: string; _id: Schema.Types.ObjectId }[];
  dueDate: string;
  dueTime: string;
  priority: string;
}

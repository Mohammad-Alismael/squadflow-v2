import { PopulatedUser } from "@/utils/@types/user";
import { Schema } from "mongoose";

interface IWorkspace {
  _id?: string;
  created_by?: string;
  updated_by?: string;
  community?: string;
  title?: string;
  participants: Array<WorkspaceParticipants>;
  columns?: WorkspaceColumn[];
  labels?: { color: string; title: string }[];
  progress?: number;
  createdAt: Date;
  updatedAt: Date;
}
interface IWorkspaceCreate {
  _id?: string;
  created_by?: string;
  updated_by?: string;
  community?: string;
  title?: string;
  participants: Array<{ user: string; role: "admin" | "editor" | "viewer" }>;
  columns?: WorkspaceColumn[];
  labels?: { color: string; title: string }[];
  progress?: number;
  createdAt: Date;
  updatedAt: Date;
}

interface WorkspaceParticipants {
  user: PopulatedUser;
  role: "admin" | "editor" | "viewer";
  _id: string;
}

export interface WorkspaceColumn {
  _id: string;
  order: number;
  title: string;
  color: string;
}

export interface WorkspaceLabel {
  _id: string | Schema.Types.ObjectId;
  title: string;
  color: string;
}

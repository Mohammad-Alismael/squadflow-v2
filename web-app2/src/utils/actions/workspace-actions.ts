"use server";
import {
  getTasksByWorkspaceId,
  getTasksByWorkspaceIdAndColumnId,
  getTasksByWorkspaceIdForCalendar,
} from "@/lib/tasks";
import { ObjectId } from "mongodb";
import {
  getWorkspaceById,
  getWorkspaceParticipants,
  getWorkspacesByCommunityAndUser,
  getWorkspacesByCommunityIdPopulated,
} from "@/lib/workspace";
import { getUserAuthFromJWT } from "@/utils/helper";
import { IWorkspace, WorkspaceParticipants } from "@/utils/@types/workspace";
import { PopulatedUser } from "@/utils/@types/user";
import Workspace from "@/models/workspace";

export const fetchWorkspaces = async () => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  if (communityId === "") return [];
  const workspaces = await getWorkspacesByCommunityAndUser(communityId, userId);
  return workspaces as IWorkspace[];
};

export const fetchWorkspace = async (workspaceId: string) => {
  if (!workspaceId) return null;
  return await getWorkspaceById(new ObjectId(workspaceId));
};
export const getTasksForWorkspace = async (
  workspaceId: string,
  columnId?: string
) => {
  try {
    return columnId
      ? await getTasksByWorkspaceIdAndColumnId(
          new ObjectId(workspaceId),
          new ObjectId(columnId)
        )
      : await getTasksByWorkspaceId(new ObjectId(workspaceId));
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const fetchTasksForCalendar = async (workspaceId: string) => {
  return (await getTasksByWorkspaceIdForCalendar(
    new ObjectId(workspaceId)
  )) as { title: string; workspace: string; _id: string; dueDate: string }[];
};

export const fetchWorkspaceParticipants = async (
  workspaceId: string,
  withDetails: boolean
) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  try {
    if (withDetails) {
      const result = await getWorkspaceParticipants(new ObjectId(workspaceId));
      const listWithoutUserId = result.participants.filter(
        (item: { _id: string; user: PopulatedUser; role: string }) => {
          return item.user._id !== userId;
        }
      );
      return listWithoutUserId as WorkspaceParticipants[];
    } else {
      const res = await getWorkspaceById(new ObjectId(workspaceId));
      const listWithoutUserId = res.participants.filter(
        (item: { _id: string; user: string; role: string }) => {
          return item.user !== userId;
        }
      );
      return listWithoutUserId as WorkspaceParticipants[];
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getWorkspacePrivilege = async (workspaceId: string) => {
  try {
    const { _id: userId, communityId } = await getUserAuthFromJWT();
    const result = await Workspace.aggregate([
      { $match: { _id: new ObjectId(workspaceId) } },
      { $unwind: "$participants" },
      { $match: { "participants.user": new ObjectId(userId) } },
      { $project: { _id: 0, role: "$participants.role" } },
    ]);
    if (result.length === 0) {
      return null; // No matching participant found
    }

    return result[0].role;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

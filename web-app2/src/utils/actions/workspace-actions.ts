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

export const fetchWorkspaces = async () => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
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
  console.log(
    "fetchWorkspaceParticipants called with workspaceId:",
    workspaceId,
    "and withDetails:",
    withDetails
  );

  const { _id: userId, communityId } = await getUserAuthFromJWT();
  console.log("User auth info:", userId, communityId);
  try {
    if (withDetails) {
      const result = await getWorkspaceParticipants(new ObjectId(workspaceId));
      const listWithoutUserId = result.participants.filter(
        (item: { _id: string; user: PopulatedUser; role: string }) => {
          return item.user._id !== userId;
        }
      );
      console.log("Participants with details:", listWithoutUserId);
      return listWithoutUserId as WorkspaceParticipants[];
    } else {
      const res = await getWorkspaceById(new ObjectId(workspaceId));
      const listWithoutUserId = res.participants.filter(
        (item: { _id: string; user: string; role: string }) => {
          return item.user !== userId;
        }
      );
      console.log("Participants without details:", listWithoutUserId);
      return listWithoutUserId as WorkspaceParticipants[];
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

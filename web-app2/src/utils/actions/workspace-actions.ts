"use server";
import {
  createTask,
  getTaskIdPopulated,
  getTasksByWorkspaceId,
  getTasksByWorkspaceIdAndColumnId,
  getTasksByWorkspaceIdForCalendar,
  updateTask,
} from "@/lib/tasks";
import { ObjectId } from "mongodb";
import {
  getWorkspaceById,
  getWorkspaceParticipants,
  getWorkspacesByCommunityAndUser,
  getWorkspacesByCommunityIdPopulatedWithUserId,
  updateWorkspace,
} from "@/lib/workspace";
import { getUserAuthFromJWT } from "@/utils/helper";
import {
  IWorkspace,
  WorkspaceColumn,
  WorkspaceParticipants,
} from "@/utils/@types/workspace";
import { PopulatedUser } from "@/utils/@types/user";
import Workspace from "@/models/workspace";
import Task from "@/models/task";
import {
  restructureComments,
  restructureCommentsv2,
} from "@/app/api/tasks/[taskId]/helper";
import { ITaskState } from "@/utils/store/taskPropertiesStore";
import {
  ICommentCreate,
  ITask,
  ITaskAction,
  TaskResponse,
} from "@/utils/@types/task";
import { safeStringify } from "@/utils/helper-client";
import { NextResponse } from "next/server";
import { isUserIdHasRole } from "@/lib/helper/workspace.helper";
import { checkUserIdsExist } from "@/lib/users";
import { cache } from "react";
export const fetchWorkspaces = async () => {
  const payload = await getUserAuthFromJWT();
  const userId = payload?._id as string;
  const communityId = payload?.communityId as string;
  if (communityId === "") return [];
  const workspaces = await getWorkspacesByCommunityIdPopulatedWithUserId(
    communityId,
    userId
  );
  return workspaces as IWorkspace[];
};

export const fetchWorkspace = cache(async (workspaceId: string) => {
  console.log("calling fetchWorkspace");
  if (!workspaceId) return null;
  const res = await getWorkspaceById(new ObjectId(workspaceId));
  return JSON.parse(JSON.stringify(res)) as IWorkspace;
});

export const handleUpdateWorkspace = async (
  data: { title: string; participants: { user: string; role: string }[] },
  workspaceId: string
) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  console.log(data);
  console.log({ userId });
  const workspace: IWorkspace = await getWorkspaceById(
    new ObjectId(workspaceId)
  );
  const x = isUserIdHasRole(workspace.participants, userId, "admin");
  if (!x) throw new Error("you are not allowed to change workspace details");

  const userIdsToCheck: string[] = data.participants.map(
    ({ user }: { user: string; role: string }) => user
  );
  const allExist = await checkUserIdsExist(userIdsToCheck);
  if (!allExist)
    return NextResponse.json(
      { message: "some user participant id(s) aren't valid" },
      { status: 400 }
    );
  await Workspace.updateOne(
    { _id: workspace._id },
    {
      title: data.title,
      participants: data.participants,
      updated_by: userId,
    },
    { new: true }
  );
  console.log("successfully update workspace id", workspace._id);
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

export const getWorkspacePrivilege = cache(async (workspaceId: string) => {
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
});

export const createNewColumn = async (
  workspaceId: string,
  newColumn: {
    order: number;
    title: string;
    color: string;
  }
) => {
  try {
    const res = await Workspace.findOne(
      { _id: workspaceId, "columns.title": newColumn.title },
      { "columns.$": 1 }
    );
    console.log("createNewColumn", res);
    if (res) {
      throw new Error("column is already created");
    }
    await Workspace.updateOne(
      { _id: workspaceId },
      { $push: { columns: newColumn } }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteColumn = async (workspaceId: string, columnId: string) => {
  try {
    await Workspace.updateOne(
      { _id: workspaceId },
      { $pull: { columns: { _id: columnId } } }
    );
    await Task.deleteMany({ columnId });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export type ModifiedITaskState = Omit<ITaskState, "comments"> & {
  comments: ICommentCreate[];
};

export const handleUpdateTask = async (data: ModifiedITaskState) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();

  try {
    data.comments = restructureCommentsv2(
      data.comments as ICommentCreate[],
      userId
    );
    await updateTask(data.taskId, {
      ...data,
      updated_by: new ObjectId(userId) as ObjectId,
    });
    console.log(`successfully updated task ${data.taskId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleGetTaskById = async (taskId: string | undefined) => {
  try {
    if (!taskId || taskId === "") return null;
    const task = await getTaskIdPopulated(new ObjectId(taskId));
    return task as TaskResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchWorkspaceColumns = async (workspaceId: string) => {
  try {
    const workspace = await getWorkspaceById(new ObjectId(workspaceId));
    return workspace.columns;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchWorkspaceLabels = async (workspaceId: string) => {
  try {
    const workspace = await getWorkspaceById(new ObjectId(workspaceId));
    return workspace.labels;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const handleCreateTask = async (data: ITaskAction) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();

  data.comments = data.comments.map((comment) => ({
    created_by: userId,
    text: comment.text,
  }));
  const task = await createTask({
    ...data,
    created_by: new ObjectId(userId),
  });
};

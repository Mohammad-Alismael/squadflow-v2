"use server";
import {
  createTask,
  getMetaTasksByWorkspaceId,
  getTaskIdPopulated,
  getTasksByWorkspaceId,
  getTasksByWorkspaceIdAndColumnId,
  getTasksByWorkspaceIdForCalendar,
  updateTask,
} from "@/lib/tasks";
import { ObjectId } from "mongodb";
import {
  deleteLabelFromWorkspace,
  getMetaWorkspacesByCommunityIdPopulatedWithUserId,
  getWorkspaceById,
  getWorkspaceByIdPopulated,
  getWorkspaceParticipants,
  getWorkspacesByCommunityAndUser,
  getWorkspacesByCommunityIdPopulatedWithUserId,
  updateWorkspace,
  updateWorkspaceLabelsList,
} from "@/lib/workspace";
import { getUserAuthFromJWT } from "@/utils/helper";
import {
  IWorkspace,
  WorkspaceColumn,
  WorkspaceLabel,
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
import { NextResponse } from "next/server";
import { isUserIdHasRole } from "@/lib/helper/workspace.helper";
import { checkUserIdsExist } from "@/lib/users";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import { getRedisClient } from "@/lib/redis-setup";

export const fetchWorkspaces = cache(async () => {
  const payload = await getUserAuthFromJWT();
  const userId = payload?._id as string;
  const communityId = payload?.communityId as string;
  if (communityId === "") return [];
  const workspaces = await getWorkspacesByCommunityIdPopulatedWithUserId(
    communityId,
    userId
  );
  return workspaces as IWorkspace[];
});
export const fetchMetaWorkspaces = cache(async () => {
  const payload = await getUserAuthFromJWT();
  const userId = payload?._id as string;
  const communityId = payload?.communityId as string;
  if (communityId === "") return [];
  const workspaces = await getMetaWorkspacesByCommunityIdPopulatedWithUserId(
    communityId,
    userId
  );
  return workspaces as IWorkspace[];
});

export const fetchWorkspace = cache(async (workspaceId: string) => {
  console.log(`calling fetchWorkspace for _id ${workspaceId}`);
  if (!workspaceId) return null;
  const client = await getRedisClient();
  console.time("calling fetchWorkspace cache");
  const workspaceCache = await client.get(`workspace_${workspaceId}`);
  console.timeEnd("calling fetchWorkspace cache");

  if (workspaceCache)
    return JSON.parse(workspaceCache) as unknown as IWorkspace;

  console.time("calling fetchWorkspace");
  const res = await getWorkspaceByIdPopulated(new ObjectId(workspaceId));
  console.timeEnd("calling fetchWorkspace");
  await client.set(`workspace_${workspaceId}`, JSON.stringify(res));
  return JSON.parse(JSON.stringify(res)) as IWorkspace;
});

export const handleUpdateWorkspace = async (
  data: { title: string; participants: { user: string; role: string }[] },
  workspaceId: string
) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  const client = await getRedisClient();

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
  const cache = data.participants.map(async (item) => {
    await client.set(`${workspace._id}_user_role_${item.user}`, item.role);
  });
  await Promise.all(cache);
  await client.del(`workspace_${workspace._id}`);
  console.log("successfully update workspace id", workspace._id);
};

export const updateColumnTitleById = async (
  workspaceId: string,
  columnId: string,
  newTitle: string
) => {
  try {
    const result = await Workspace.updateOne(
      { _id: workspaceId, "columns._id": columnId },
      {
        $set: { "columns.$.title": newTitle },
      }
    );
    const client = await getRedisClient();
    await client.del(`workspace_${workspaceId}`);
    console.log("Column title updated successfully:", result);
    revalidatePath(`/workspaces/${workspaceId}`);
  } catch (error) {
    console.error("Error updating column title:", error);
  }
};

export const getTasksForWorkspace = async (
  workspaceId: string,
  columnId?: string
) => {
  try {
    console.time("getTasksForWorkspace");
    const res = columnId
      ? await getTasksByWorkspaceIdAndColumnId(
          new ObjectId(workspaceId),
          new ObjectId(columnId)
        )
      : await getMetaTasksByWorkspaceId(new ObjectId(workspaceId));
    console.timeEnd("getTasksForWorkspace");
    return res;
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
const handleGetWorkspaceParticipantsCache = async (
  workspaceId: string,
  callback: () => Promise<any>
) => {
  try {
    const client = await getRedisClient();
    console.time("getWorkspaceParticipantsCache");
    const workspaceCache = await client.get(`workspace_${workspaceId}`);
    console.timeEnd("getWorkspaceParticipantsCache");

    if (workspaceCache)
      return JSON.parse(workspaceCache)
        .participants as IWorkspace["participants"];
    else {
      return callback();
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchWorkspaceParticipants = async (
  workspaceId: string,
  withDetails: boolean
) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  try {
    if (withDetails) {
      const callback = async () => {
        const result = await getWorkspaceParticipants(
          new ObjectId(workspaceId)
        );
        return result.participants;
      };
      let participantsList: WorkspaceParticipants[] =
        await handleGetWorkspaceParticipantsCache(workspaceId, callback);
      // let participantsList: WorkspaceParticipants[] = await callback();
      const listWithoutUserId = participantsList.filter(
        (item: { _id: string; user: PopulatedUser; role: string }) => {
          return item.user._id !== userId;
        }
      );
      return listWithoutUserId as WorkspaceParticipants[];
    } else {
      const callback = async () => {
        const result = await getWorkspaceById(new ObjectId(workspaceId));
        return result.participants;
      };

      let participantsList: WorkspaceParticipants[] =
        await handleGetWorkspaceParticipantsCache(workspaceId, callback);
      // let participantsList: WorkspaceParticipants[] = await callback();

      const listWithoutUserId = participantsList.filter(
        (item: WorkspaceParticipants) => {
          return item.user._id !== userId;
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
    const client = await getRedisClient();
    console.time("getWorkspacePrivilege from cache");
    const cacheRole = await client.get(`${workspaceId}_user_role_${userId}`);
    console.timeEnd("getWorkspacePrivilege from cache");
    if (cacheRole) {
      console.log({ cacheRole });
      return cacheRole;
    }
    console.time("getWorkspacePrivilege");
    const result = await Workspace.aggregate([
      { $match: { _id: new ObjectId(workspaceId) } },
      { $unwind: "$participants" },
      { $match: { "participants.user": new ObjectId(userId) } },
      { $project: { _id: 0, role: "$participants.role" } },
    ]);
    if (result.length === 0) {
      return null; // No matching participant found
    }
    const role = result[0].role;
    console.timeEnd("getWorkspacePrivilege");
    await client.set(`${workspaceId}_user_role_${userId}`, role);
    return role;
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
    const res2 = await Workspace.findOne(
      { _id: workspaceId, "columns.order": newColumn.order },
      { "columns.$": 1 }
    );
    if (res) {
      throw new Error("column is already created");
    }
    if (res2) {
      throw new Error("order column is incorrect");
    }
    const client = await getRedisClient();
    await client.del(`workspace_${workspaceId}`);

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
    const client = await getRedisClient();
    await client.del(`workspace_${workspaceId}`);
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
    const client = await getRedisClient();
    const workspaceCache = await client.get(`workspace_${workspaceId}`);
    if (workspaceCache)
      return JSON.parse(workspaceCache).columns as unknown as WorkspaceColumn[];
    const workspace = await getWorkspaceById(new ObjectId(workspaceId));
    return workspace.columns;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchWorkspaceLabels = async (workspaceId: string) => {
  try {
    const client = await getRedisClient();
    const workspaceCache = await client.get(`workspace_${workspaceId}`);
    if (workspaceCache)
      return JSON.parse(workspaceCache).labels as unknown as WorkspaceLabel[];
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

export const getWorkspaceLabels = async (workspaceId: string) => {
  try {
    const res = await Workspace.findById(workspaceId);
    return JSON.parse(JSON.stringify(res.labels)) as WorkspaceLabel[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createWorkspaceLabel = async (
  workspaceId: string,
  data: { title: string; color: string }
) => {
  if (data.title === "") throw new Error("label title should not bbe empty");
  try {
    await updateWorkspaceLabelsList(new ObjectId(workspaceId), {
      color: data.color,
      title: data.title,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateWorkspaceLabel = async (
  workspaceId: string,
  data: { _id: string; title: string; color: string }
) => {
  try {
    const result = await Workspace.findOneAndUpdate(
      { _id: workspaceId, "labels._id": data._id },
      {
        $set: {
          "labels.$.title": data.title,
          "labels.$.color": data.title,
        },
      },
      { new: true } // Returns the updated document
    );

    return result;
  } catch (error) {
    console.error("Error updating label:", error);
    throw error;
  }
};

export const deleteWorkspaceLabel = async (
  workspaceId: string,
  labelId: string
) => {
  try {
    await deleteLabelFromWorkspace(
      new ObjectId(workspaceId),
      new ObjectId(labelId)
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

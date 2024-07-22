import { connectMongoDB } from "@/lib/mongodb";
import Workspace from "@/models/workspace";
import User from "@/models/user";
import { ObjectId } from "mongodb";
import { deleteTasksByWorkspaceId } from "@/lib/tasks";
import Task from "@/models/task";
import CustomError from "@/utils/CustomError";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
import mongoose from "mongoose";
import { IWorkspace } from "@/utils/@types/workspace";

async function init() {
  await connectMongoDB();
}

async function createWorkspace(workspace: IWorkspace) {
  await init();
  try {
    const result = await Workspace.create({
      community: workspace.community,
      title: workspace.title,
      participants: workspace.participants,
      created_by: workspace.created_by,
      updated_by: workspace.created_by,
    });
    console.log(`Workspace inserted with _id: ${result}`);
    return result;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function updateWorkspace(workspace: IWorkspace) {
  await init();
  try {
    const result = await Workspace.updateOne(
      { _id: workspace._id },
      {
        title: workspace.title,
        participants: workspace.participants,
        labels: workspace.labels,
        updated_by: workspace.created_by,
      },
      { new: true }
    );
    console.log(`Workspace updated with _id: ${result}`);
    return result;
  } catch (error) {
    console.error("Error updating Community:", error);
    throw error;
  }
}

async function updateWorkspaceLabelsList(
  workspaceId: ObjectId,
  labels: { color: string; title: string }
) {
  await init();
  try {
    const result = await Workspace.findOneAndUpdate(
      { _id: workspaceId },
      { $push: { labels: labels } },
      { new: true }
    );
    console.log(`Workspace updated with _id: ${result}`);
    return result;
  } catch (error) {
    console.error("Error updating Community:", error);
    throw error;
  }
}

async function getWorkspaceById(workspaceId: ObjectId) {
  await init();
  const workspace = await Workspace.findOne({ _id: workspaceId });
  if (!workspace) {
    throw new CustomError("workspace not found", HttpStatusCode.NOT_FOUND);
  }
  return workspace;
}
async function getWorkspaceByIdPopulated(workspaceId: ObjectId) {
  await init();
  const workspace = await Workspace.findOne({ _id: workspaceId })
    .populate({
      path: "participants.user",
      select: "_id username email role",
    })
    .exec();
  if (!workspace) {
    throw new CustomError("workspace not found", HttpStatusCode.NOT_FOUND);
  }
  return workspace;
}
async function getWorkspaceParticipants(workspaceId: ObjectId) {
  await init();
  const workspace = await Workspace.findById(workspaceId)
    .select("participants")
    .populate({
      path: "participants.user",
      select: "_id username email role",
    })
    .exec();
  if (!workspace) {
    throw new CustomError("workspace not found", HttpStatusCode.NOT_FOUND);
  }
  return workspace;
}

async function getWorkspacesByCommunityIdPopulated(communityId: string) {
  await init();
  const workspaces = await Workspace.find({ community: communityId })
    .populate({
      path: "participants.user",
      select: "_id username email role photoURL",
    })
    .exec();
  if (!workspaces) {
    throw new Error("workspace not found");
  }
  return workspaces;
}

async function getWorkspacesByCommunityIdPopulatedWithUserId(
  communityId: string,
  userId: string
) {
  await init();
  const workspaces = await Workspace.find({
    community: communityId,
    "participants.user": userId, // Ensure the user is a participant
  })
    .populate({
      path: "participants.user",
      select: "_id username email role photoURL",
    })
    .exec();
  if (!workspaces) {
    throw new Error("workspace not found");
  }
  return workspaces;
}

async function getWorkspacesByCommunityId(communityId: string) {
  await init();
  const workspaces = await Workspace.find({ community: communityId });
  if (!workspaces) {
    throw new Error("workspace not found");
  }
  return workspaces;
}

const getWorkspacesByCommunityAndUser = async (
  communityId: string,
  userId: string
) => {
  try {
    const workspaces = await Workspace.find({
      community: communityId,
      "participants.user": new ObjectId(userId),
    })
      .populate({
        path: "participants.user",
        select: "_id username email role",
      })
      .exec();
    return workspaces;
  } catch (err) {
    console.error(err);
    throw new CustomError(
      "Error fetching workspaces",
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
};

async function deleteLabelFromWorkspace(
  workspaceId: ObjectId,
  labelId: ObjectId
) {
  await init();
  try {
    await Workspace.updateOne(
      { _id: workspaceId },
      { $pull: { labels: { _id: labelId } } }
    );
  } catch (error) {
    console.error("Error updating Community:", error);
    throw error;
  }
}

async function deleteWorkspaceById(workspaceId: ObjectId) {
  await init();
  await Workspace.deleteOne({ _id: workspaceId });
  await deleteTasksByWorkspaceId(workspaceId);
}

async function deleteWorkspacesByCommunityId(communityId: ObjectId) {
  await init();
  const { deletedCount } = await Task.deleteMany({ community: communityId });
  return deletedCount;
}

async function getUserRoleInWorkspace(workspaceId: string, userId: string) {
  try {
    const project = await Workspace.findOne(
      {
        _id: new ObjectId(workspaceId),
        "participants.user": new ObjectId(userId),
      },
      { "participants.$": 1 } // Project only the matching participant
    );

    if (project && project.participants.length > 0) {
      return project.participants[0].role;
    } else {
      return null; // User is not a participant in this project
    }
  } catch (error) {
    console.error("Error finding user role in workspace:", error);
    throw new CustomError(
      "Error finding user role in workspace",
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
  }
}

export {
  createWorkspace,
  getWorkspaceById,
  deleteWorkspaceById,
  updateWorkspace,
  updateWorkspaceLabelsList,
  deleteLabelFromWorkspace,
  deleteWorkspacesByCommunityId,
  getWorkspacesByCommunityId,
  getUserRoleInWorkspace,
  getWorkspaceParticipants,
  getWorkspacesByCommunityAndUser,
  getWorkspacesByCommunityIdPopulated,
  getWorkspaceByIdPopulated,
  getWorkspacesByCommunityIdPopulatedWithUserId,
};

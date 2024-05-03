import { connectMongoDB } from "@/lib/mongodb";
import Workspace from "@/models/workspace";
import User from "@/models/user";
import { ObjectId } from "mongodb";
import { deleteTasksByWorkspaceId } from "@/lib/tasks";

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
      }
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
  labels: IWorkspace["labels"][0]
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
    throw new Error("workspace not found");
  }
  return workspace;
}

async function deleteWorkspaceById(workspaceId: ObjectId) {
  await init();
  await Workspace.deleteOne({ _id: workspaceId });
  await deleteTasksByWorkspaceId(workspaceId);
}

export {
  createWorkspace,
  getWorkspaceById,
  deleteWorkspaceById,
  updateWorkspace,
  updateWorkspaceLabelsList,
};

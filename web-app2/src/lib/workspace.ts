import { connectMongoDB } from "@/lib/mongodb";
import Workspace from "@/models/workspace";

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

export { createWorkspace };

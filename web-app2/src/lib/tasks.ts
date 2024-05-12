import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";
import { ObjectId } from "mongodb";
import { ITask } from "@/utils/@types/task";
import CustomError from "@/utils/CustomError";

async function init() {
  await connectMongoDB();
}
const createTask = async ({
  workspace,
  title,
  columnId,
  participants,
  labels,
  dueDate,
  dueTime,
  priority,
  description,
  attachments,
  created_by,
}: ITask) => {
  await init();
  try {
    // Create the task
    const task = await Task.create({
      workspace,
      title,
      columnId,
      participants,
      labels,
      dueDate,
      dueTime,
      priority,
      description,
      attachments,
      created_by,
      updated_by: created_by,
    });

    // Return the created task
    return task;
  } catch (error) {
    // Handle error
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};

async function getTaskId(taskId: ObjectId) {
  await init(); // Assuming this is your initialization function
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    throw new CustomError("Task ID not found", 404);
  }
  return task;
}

async function getTasksByWorkspaceId(workspaceId: ObjectId) {
  await init();
  return Task.find({ workspace: workspaceId });
}

async function getTasksByWorkspaceIdAndColumnId(
  workspaceId: ObjectId,
  columnId: ObjectId
) {
  await init();
  return Task.find({ $and: [{ workspace: workspaceId }, { columnId }] });
}

async function deleteTasksByWorkspaceId(workspaceId: ObjectId) {
  await init();
  const { deletedCount } = await Task.deleteMany({ workspace: workspaceId });
  return deletedCount;
}

const updateTask = async (taskId: string, updateData: ITask) => {
  try {
    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });

    // Return the updated task
    return updatedTask;
  } catch (error) {
    // Handle error
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};

// Function to delete a task
const deleteTask = async (taskId: ObjectId) => {
  try {
    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // Return the deleted task
    return deletedTask;
  } catch (error) {
    // Handle error
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};

async function getCommentsTaskId(taskId: ObjectId) {
  await init();
  try {
    const result = (await Task.findById(taskId)
      .populate({
        path: "comments.user",
        select: "_id username email",
      })
      .exec()) as ITask;

    if (!result) throw new Error("task Id doesn't exists");
    return result.comments;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

const addCommentToTask = async (
  taskId: string,
  comment: ITask["comments"][0]
) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      { $push: { comments: comment } },
      { new: true }
    );
    return task._id;
  } catch (error) {
    // Handle error
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};

export {
  createTask,
  getTaskId,
  updateTask,
  deleteTask,
  addCommentToTask,
  getCommentsTaskId,
  deleteTasksByWorkspaceId,
  getTasksByWorkspaceId,
  getTasksByWorkspaceIdAndColumnId,
};

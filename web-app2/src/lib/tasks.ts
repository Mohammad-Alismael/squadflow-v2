import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";
import { ObjectId } from "mongodb";
import { ITask } from "@/utils/@types/task";
import { CommunitySchema } from "@/utils/@types/CommunitySchema";

async function init() {
  await connectMongoDB();
}
const createTask = async ({
  workspace,
  title,
  columnId,
  participants,
  tags,
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
      workspace: workspace,
      title: title,
      columnId: columnId,
      participants: participants,
      tags: tags,
      dueDate: dueDate,
      dueTime: dueTime,
      priority: priority,
      description: description,
      attachments: attachments,
      created_by: created_by,
      updated_by: created_by, // Assuming the creator also updates the task initially
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
  await init();
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    const error = new Error("Task ID not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
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
      .exec()) as CommunitySchema;

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
};
